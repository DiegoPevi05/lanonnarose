import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {  useGLTF } from '@react-three/drei';
import { ClipboardList, Cake as IconCake } from 'lucide-react';
import * as THREE from 'three';

const vertexShader = `
  uniform float time;
  varying vec2 vUv;
  varying float hValue;

  // 2D Random
  float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // 2D Noise based on Morgan McGuire @morgan3d
  float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    pos *= vec3(0.8, 2, 0.725);
    hValue = position.y;
    float posXZlen = length(position.xz);
    pos.y *= 1. + (cos((posXZlen + 0.25) * 3.1415926) * 0.25 + noise(vec2(0, time)) * 0.125 + noise(vec2(position.x + time, position.z + time)) * 0.5) * position.y;
    pos.x += noise(vec2(time * 2., (position.y - time) * 4.0)) * hValue * 0.0312;
    pos.z += noise(vec2((position.y - time) * 4.0, time * 2.)) * hValue * 0.0312;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
  }
`;

const fragmentShader = `
  varying float hValue;
  varying vec2 vUv;

  vec3 heatmapGradient(float t) {
    return clamp((pow(t, 1.5) * 0.8 + 0.2) * vec3(smoothstep(0.0, 0.35, t) + t * 0.5, smoothstep(0.5, 1.0, t), max(1.0 - t * 1.7, t * 7.0 - 6.0)), 0.0, 1.0);
  }

  void main() {
    float v = abs(smoothstep(0.0, 0.4, hValue) - 1.);
    float alpha = (1. - v) * 0.99;
    alpha -= 1. - smoothstep(1.0, 0.97, hValue);
    gl_FragColor = vec4(heatmapGradient(smoothstep(0.0, 0.3, hValue)) * vec3(0.95,0.95,0.4), alpha);
    gl_FragColor.rgb = mix(vec3(0,0,1), gl_FragColor.rgb, smoothstep(0.0, 0.3, hValue));
    gl_FragColor.rgb += vec3(1, 0.9, 0.5) * (1.25 - vUv.y);
    gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.66, 0.32, 0.03), smoothstep(0.95, 1., hValue));
  }
`;


interface CakeProps {
  windowSize: "sm" | "md" | "lg" | "xl";
}

const Cake = (props:CakeProps) => {
  const cakeRef:any = useRef();
  const { scene } = useGLTF('/cakes/strawberry_cake.glb');


  // Find candle objects in the GLB model
  const candles:any[] = [];
  scene.traverse((child) => {
    if (['pCone1','pCone2','pCone3','pCone4','pCone5','pCone6','pCone7','pCone8'].includes(child.name)) {
      candles.push(child);
      child.visible = false;
    }
  });

 // Create a shared ShaderMaterial for all flames
  const flameMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  const flameGeometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.5, 32, 32);
    geo.translate(0, 0.5, 0);
    return geo;
  }, []);

  const flameRefs:any = useRef(candles.map(() => React.createRef()));
  const lightRefs:any = useRef(candles.map(() => React.createRef()));

  // Update positions every frame
  useFrame((state) => {
    // Update the time uniform for flame animation
    flameMaterial.uniforms.time.value = state.clock.getElapsedTime();

    if (cakeRef.current) {
      // Rotate the cake
      cakeRef.current.rotation.y += 0.002;

      // Ensure the scene's world matrix is updated
      scene.updateMatrixWorld(true);

      // Position spheres and lights at each candle
      candles.forEach((candle, index) => {
        const worldPos = new THREE.Vector3();
        candle.getWorldPosition(worldPos);
        const localPos = cakeRef.current.worldToLocal(worldPos.clone());

        // Update sphere position
        if (flameRefs.current[index].current) {
          localPos.y -= 0.001;
          flameRefs.current[index].current.position.copy(localPos);
        }

        // Update light position
        if (lightRefs.current[index].current) {
          lightRefs.current[index].current.position.copy(localPos);
        }
      });
    }
  });

  const [initalPosition,setInitialPosition] = useState<{
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];

  }>({ position: [0.7, -1.3, 3], rotation: [0.2,0,0], scale: [30, 30, 30] });

  useEffect(() => {
    if(props.windowSize == "sm"){
      setInitialPosition(
        { position: [0, -2.3, 2.5], rotation: [0,0,0], scale: [30, 30, 30] }
      )
    }
  }, [props.windowSize]);

  return (
    <group ref={cakeRef} position={initalPosition.position} rotation={initalPosition.rotation} scale={initalPosition.scale}>
      {/* Render the GLB model */}
      <primitive object={scene} />
      {/* Add point lights at candle positions */}

      {candles.map((_, index) => {
        // Compute the light position by transforming the candle's position with the scene's matrix
        return (
          <React.Fragment key={index}>
            {/* Point light for candle glow */}
            <pointLight
              ref={lightRefs.current[index]}
              intensity={1}    // Adjust intensity for glow effect
              distance={1.5}       // Limit the light's reach
              decay={3}          // Smooth falloff
              color="#ffaa33"     // Warm color for candle glow
              castShadow={true}
            />
            <pointLight
              ref={lightRefs.current[index]}
              intensity={1}    // Adjust intensity for glow effect
              distance={1.5}       // Limit the light's reach
              decay={3}          // Smooth falloff
              color="#ffaa33"     // Warm color for candle glow
              castShadow={true}
            />
            {/* Circle to mark candle position */}
            <mesh ref={flameRefs.current[index]} material={flameMaterial} geometry={flameGeometry} scale={[0.0015, 0.002, 0.0015]} />
          </React.Fragment>
        );
      })}
    </group>
  );
};


interface BirthdaySceneProps {
  windowSize: "sm" | "md" | "lg" | "xl";
}

const BirthdayScene = (props:BirthdaySceneProps) => {

  const lightRef:any = useRef(); // Create a ref to access the directional light

  // Use useEffect to modify the light's position after it's created
  useEffect(() => {
    if (lightRef.current) {
      lightRef.current.position.setScalar(10); // Set scalar value of 10 to position
    }
  }, []);

  return (
    <div id="event-0" className="event-section h-full min-w-[100vw] relative">
      <Canvas
        gl={(canvas) => {
          const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true, // Optional: improves edge smoothness
          });
          // Set your custom renderer properties here
          renderer.setClearColor(0x101005); // Dark grayish color
          renderer.shadowMap.enabled = true; // Enable shadow mapping
          renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadow map type
          return renderer;
        }}
      >
        {/* Lighting setup */}
        <ambientLight 
          intensity={0.025} 
        />
        <directionalLight
          ref={lightRef} // Attach the ref to the directionalLight
          position={[0, 5, 5]} // Initial position (will be overridden by setScalar)
          intensity={0.0625}
          castShadow
        />
        {/* Add the rotating cake */}
        <Cake windowSize={props.windowSize} />
      </Canvas>
      {/* HTML overlay for text or other elements */}
      <p className='absolute top-[20%] right-[2rem]  lg:right-[5rem] w-[50%] lg:w-auto text-primary leading-[40px] sm:leading-[70px] text-right font-heading text-wrap text-4xl sm:text-6xl text-shadow-primary animation-element slide-in'>Happy Birthday</p>
      <div className='
        absolute 
        birthday-info-wrapper
        left-[4%] sm:left-[10%] 
        top-[45%] sm:top-1/2 
        -translate-y-1/2
        h-auto sm:h-[300px]
        w-[400px]
        font-heading 
        text-primary 
        flex flex-col items-start justify-start
      '>
        <div className="birthday-info">
          <div className="birthday-info-text">
            <p className="text-sm sm:text-xl font-body text-justify mt-5">
              We can make your birthday special by sharing a cake with you. It's a special day for you and for all of us who love you. We bring you different cakes that you can enjoy with your loved ones.
            </p>
            <div className='w-full h-auto flex flex-row justify-between items-center mt-4'>
              <button className='font-heading border-2 border-primary text-primary px-5 py-2 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 ease-in-out active:scale-95 inline-flex gap-x-2'>
                <ClipboardList/>
                Catalog
              </button>
              <button className='font-heading border-2 border-cocoa text-cocoa px-5 py-2 rounded-lg hover:bg-cocoa hover:text-white transition-all duration-300 ease-in-out active:scale-95 inline-flex gap-x-2'>
                <IconCake />
                Birthday Cakes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayScene;
