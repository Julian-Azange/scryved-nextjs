'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generador de partículas esféricas
function generateParticles(count: number) {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos((Math.random() * 2) - 1);
        
        // Distribución en un volumen amplio
        const radius = 10 + Math.random() * 20; 
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }
    return positions;
}

function ParticleCloud() {
    const ref = useRef<THREE.Points>(null);
    const particles = useMemo(() => generateParticles(1500), []);
    
    // Animar las partículas suavemente y reaccionar al ratón
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x -= 0.0003;
            ref.current.rotation.y -= 0.0005;
            
            // Leve interacción con el ratón
            const mouseX = (state.pointer.x * Math.PI) / 10;
            const mouseY = (state.pointer.y * Math.PI) / 10;
            
            // Suavizado (Lerp)
            ref.current.rotation.x += (mouseY - ref.current.rotation.x) * 0.02;
            ref.current.rotation.y += (mouseX - ref.current.rotation.y) * 0.02;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#a3e635"
                    size={0.08}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.4}
                />
            </Points>
        </group>
    );
}

export default function SceneBackground() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full opacity-60 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <ParticleCloud />
            </Canvas>
        </div>
    );
}
