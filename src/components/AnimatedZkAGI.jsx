import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

export default function AnimatedZkAGI() {
  const orbRef = useRef();
  const [hovered, setHovered] = useState(false);
  useFrame(() => {
    if (orbRef.current) orbRef.current.rotation.y += 0.01;
  });

  return (
    <mesh
      ref={orbRef}
      position={[0, 2, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color={hovered ? 'cyan' : 'white'} emissive="blue" />
      {hovered && (
        <Html center>
          <div className="bg-white text-black p-4 rounded shadow">
            <button onClick={() => alert('Login action')}>Login to Portal</button>
          </div>
        </Html>
      )}
    </mesh>
  );
}