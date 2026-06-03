import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html, useProgress } from '@react-three/drei';
import Scene from './Scene';

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="canvas-loader">Loading {Math.round(progress)}%</div>
    </Html>
  );
};

const ThreeCanvas = () => (
  <div className="three-canvas-wrapper">
    <Canvas camera={{ position: [0, 1.5, 5], fov: 40 }} dpr={[1, 2]}>
      <Suspense fallback={<Loader />}>
        <Scene />
        <Environment preset="city" />
      </Suspense>
      <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2.3} />
    </Canvas>
  </div>
);

export default ThreeCanvas;
