import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';


const Cake = () => {
  const cakeRef:any = useRef();
  const { scene } = useGLTF('/cakes/strawberry_cake.glb');


  // Find candle objects in the GLB model
  const candles:any[] = [];
  scene.traverse((child) => {
    if (child.name == 'pCone1') {
      candles.push(child);
    }
  });

  // Store absolute positions for candles (updated every frame)
  const candleWorldPositions = useRef(candles.map(() => new THREE.Vector3()));

  // Rotate the cake and update candle positions
  useFrame(() => {
    if (cakeRef.current) {
      // Rotate the cake
      cakeRef.current.rotation.y += 0.01;

      // Update absolute world positions for each candle
      candles.forEach((candle, index) => {
        candleWorldPositions.current[index]
          .copy(candle.position) // Start with local position
          .applyMatrix4(cakeRef.current.matrixWorld); // Transform to world space
      });
    }
  });

  console.log(candles);


  return (
    <group ref={cakeRef} position={[1, -1, 2.5]} rotation={[0.2,0,0]} scale={[30, 30, 30]}>
      {/* Render the GLB model */}
      <primitive object={scene} />
      {/* Add point lights at candle positions */}

      {candles.map((candle, index) => {
        // Compute the light position by transforming the candle's position with the scene's matrix
        return (
          <React.Fragment key={index}>
            {/* Point light for candle glow */}
            <pointLight
              position={candleWorldPositions.current[index]}
              intensity={1}    // Adjust intensity for glow effect
              distance={5}       // Limit the light's reach
              decay={2}          // Smooth falloff
              color="0xffaa33"     // Warm color for candle glow
              castShadow={true}
            />
            <pointLight
              position={candleWorldPositions.current[index]}
              intensity={1}    // Adjust intensity for glow effect
              distance={5}       // Limit the light's reach
              decay={2}          // Smooth falloff
              color="0xffaa33"     // Warm color for candle glow
              castShadow={true}
            />
            {/* Circle to mark candle position */}
            <mesh position={candleWorldPositions.current[index]}>
              <sphereGeometry args={[0.020, 32, 32]} /> {/* Radius 0.1, 32 width segments, 32 height segments */}
              <meshBasicMaterial color="red" />
            </mesh>
          </React.Fragment>
        );
      })}
    </group>
  );
};

const BirthdayScene = () => {

  const lightRef:any = useRef(); // Create a ref to access the directional light

  // Use useEffect to modify the light's position after it's created
  useEffect(() => {
    if (lightRef.current) {
      lightRef.current.position.setScalar(10); // Set scalar value of 10 to position
    }
  }, []);

  return (
    <div className="h-[100vh] w-full relative">
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
        <OrbitControls />
        {/* Lighting setup */}
        <ambientLight 
          //intensity={0.025} 
          intensity={1}
        />
        <directionalLight
          ref={lightRef} // Attach the ref to the directionalLight
          position={[0, 5, 5]} // Initial position (will be overridden by setScalar)
          intensity={0.0625}
          castShadow
        />
        {/* Add the rotating cake */}
        <Cake />
      </Canvas>
      {/* HTML overlay for text or other elements */}
      <div className='absolute top-[10%] left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <p className='text-primary font-heading text-6xl text-shadow-primary'>Events</p>
      </div>
      <div className='
        absolute 
        birthday-info-wrapper
        left-[10%] 
        top-1/2 
        -translate-y-1/2
        h-[60%]
        w-[400px]
        font-heading 
        text-primary 
        flex flex-col items-start justify-start
      '>
        <div className="birthday-info">
          <div className="birthday-info-text">
            <h1 className='text-4xl text-left text-shadow-primary'>Happy Birthday!</h1>
            <p className='text-xl font-body text-justify mt-5 text-shadow-primary'>
              Hola es bonito compartir en cumpleaños, es un día especial para ti y para todos los que te queremos, te traemos distintas tortas que podras degustar en compañia de tus seres queridos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayScene;
