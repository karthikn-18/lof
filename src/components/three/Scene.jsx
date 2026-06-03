import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial } from '@react-three/drei';

const Scene = () => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    meshRef.current.rotation.y = elapsed * 0.45;
    meshRef.current.position.y = Math.sin(elapsed * 1.2) * 0.15;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={1} />
      <spotLight position={[-4, 5, -2]} angle={0.2} intensity={0.8} penumbra={0.3} />
      <mesh ref={meshRef} position={[0, 0.25, 0]}>
        <icosahedronGeometry args={[1.2, 3]} />
        <MeshWobbleMaterial color="#6C63FF" speed={2.5} factor={0.35} roughness={0.12} />
      </mesh>
    </>
  );
};

export default Scene;
