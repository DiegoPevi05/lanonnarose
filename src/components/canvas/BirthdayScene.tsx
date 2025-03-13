import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Cake = () => {
  const cakeRef:any = useRef();
  const { scene } = useGLTF('/cakes/strawberry_cake.glb');

  // Rotate the cake continuously
  useFrame(() => {
    if (cakeRef.current) {
      cakeRef.current.rotation.y += 0.01; // Adjust rotation speed as needed
    }
  });

  // Find candle objects in the GLB model
  const candles:any[] = [];
  scene.traverse((child) => {
    if (child.name == 'pCone1') {
      candles.push(child);
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
        const lightPosition = new THREE.Vector3()
          .copy(candle.position)
          .applyMatrix4(scene.matrix);
        return (
          <React.Fragment key={index}>
            {/* Point light for candle glow */}
            <pointLight
              position={lightPosition}
              intensity={0.5}    // Adjust intensity for glow effect
              distance={5}       // Limit the light's reach
              color="yellow"     // Warm color for candle glow
            />
            {/* Circle to mark candle position */}
            <mesh position={lightPosition}>
              <sphereGeometry args={[100, 32, 32]} /> {/* Radius 0.1, 32 width segments, 32 height segments */}
              <meshBasicMaterial color="red" />
            </mesh>
          </React.Fragment>
        );
      })}
    </group>
  );
};

const BirthdayScene = () => {
  return (
    <div className="h-[100vh] w-full relative">
      <Canvas
        style={{
          background: '#24252B', // Gradient centered at 25% from left, 25% from top
        }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 5, 5]} intensity={1} />
        {/* Add the rotating cake */}
        <Cake />
      </Canvas>
      {/* HTML overlay for text or other elements */}
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
            <h1 className='text-4xl text-left'>Happy Birthday!</h1>
            <p className='text-lg text-justify mt-5'>
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayScene;
