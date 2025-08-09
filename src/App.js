import logo from './logo.svg';
import './index.css';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import TempleScene from './components/TempleScene';
import AnimatedZkAGI from '../src/components/AnimatedZkAGI';
import Timeline from '../src/components/Timeline';
import ScrollOverlay from '../src/components/ScrollOverlay';
import ContactBooking from '../src/components/ContactBooking';
import GalaxyGlobe from './components/GalaxyGlobe';

function App() {
  return (
    <div className="w-screen h-screen">
      <GalaxyGlobe/>
    </div>
  );
}

// function App() {
//   return (
//    <div className="w-screen h-screen">
//       {/* <Canvas camera={{ position: [0, 0, 10], fov: 45 }} shadows>
//         <ambientLight intensity={0.5} />
//         <Suspense fallback={null}>
//           <TempleScene />
//           <AnimatedZkAGI />
//         </Suspense>
//       </Canvas>
//       <div className="absolute top-0 left-0 w-full h-full pointer-events-none text-white">
//         <header className="p-6 text-center text-2xl font-bold bg-gradient-to-b from-black/80 to-transparent">
//           Aten Ventures – From the Temple of the Sun, ZkAGI is Born
//         </header>
//         <section className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center max-w-2xl">
//           <h2 className="text-xl font-semibold">Blueprints to Make Any Business AI-First</h2>
//           <p className="text-sm mt-2">We help founders, enterprises, and funds use agents, automate workflows, and unlock AI-native growth.</p>
//         </section>
//       </div>
//       <div className="absolute bottom-0 w-full bg-black/80 text-white py-6 px-8 overflow-x-auto">
//         <Timeline events={[
//           { year: '2018', label: 'Aten Ventures founded' },
//           { year: '2019', label: 'ZkAGI conceptualized (India)' },
//           { year: '2020', label: 'Singapore Studio launched' },
//           { year: '2022', label: 'Lithuanian MB approved by Startup Lithuania' },
//           { year: '2023', label: 'Fundraising Agents + BD Systems deployed' },
//           { year: '2025', label: 'Temple Website Launch' }
//         ]} />
//       </div>
//       <ScrollOverlay />
//       <ContactBooking /> */}
//       <GalaxyGlobe/>
//     </div>
//   );
// }

export default App;
