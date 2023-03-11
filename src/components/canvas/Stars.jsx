import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef(); // Referencia a un objeto de la escena

  // Estado inicial de una esfera de puntos.
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }));

  useFrame((state, delta) => {              // Actualiza el estado de la referencia a lo largo del tiempo.
    ref.current.rotation.x -= delta / 10;   // delta representa el tiempo transcurrido desde el último frame renderizado.
    ref.current.rotation.y -= delta / 15;   // y se usa para calcular el movimiento de animación suave a lo largo del tiempo.
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
    {/* points define un objeto de puntos en la escena con las posiciones de la esfera de puntos,  */}
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}> 
        {/* PointMaterial define las propiedades visuales de los puntos */}
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className='w-full h-auto absolute inset-0 z-[-1]'>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
