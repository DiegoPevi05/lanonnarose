import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const Cake = () => {
  const cakeRef = useRef();

  // Rotate the cake continuously
  useFrame(() => {
    if (cakeRef.current) {
      cakeRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={cakeRef} position={[0, 0, 0]}>
      {/* A simple cylinder to represent the cake */}
      <cylinderGeometry args={[1, 1, 0.5, 32]} />
      <meshStandardMaterial color="pink" />
    </mesh>
  );
};

const BirthdayScene = () => {
  return (
    <div className="h-[100vh] w-full relative">
      <Canvas style={{ background: 'black' }}>
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
