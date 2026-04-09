import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Stars, TorusKnot } from "@react-three/drei";
import * as THREE from "three";

const AnimatedShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.5;
    }
  });

  return (
    <TorusKnot ref={meshRef} args={[1.5, 0.4, 128, 64]} position={[4, 0, -5]}>
      <MeshDistortMaterial
        color="#2563eb"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
      />
    </TorusKnot>
  );
};

const AnimatedSphere = () => {
    const meshRef = useRef<THREE.Mesh>(null);
  
    useFrame((state) => {
      if (meshRef.current) {
        meshRef.current.position.y = Math.cos(state.clock.getElapsedTime() * 0.8) * 0.5 - 2;
        meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
      }
    });
  
    return (
      <Sphere ref={meshRef} args={[1, 64, 64]} position={[-5, -2, -3]}>
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.1}
          metalness={0.5}
          wireframe
        />
      </Sphere>
    );
  };

const Background3D = () => {
  return (
    <div className="absolute inset-0 -z-10 bg-[#020617] overflow-hidden pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4f46e5" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <AnimatedShape />
        <AnimatedSphere />
      </Canvas>
      {/* Overlay gradient to blend bottom edge into the rest of the site */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-background z-0" />
    </div>
  );
};

export default Background3D;
