import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function TempleScene() {
  const templeRef = useRef();
  useFrame(() => {
    if (templeRef.current) templeRef.current.rotation.y += 0.001;
  });

  return (
    <mesh ref={templeRef} position={[0, -1, 0]}>
      <cylinderGeometry args={[4, 4, 1, 32]} />
      <meshStandardMaterial color="goldenrod" />
    </mesh>
  );
}