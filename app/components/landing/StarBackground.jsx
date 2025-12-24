"use client";
import React, { useState, useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.cjs";

const StarBackground = (props) => {
    const ref = useRef();

    const [sphere] = useState(() =>
        random.inSphere(new Float32Array(5000 * 3), { radius: 1.2 })
    );

    const baseXSpeed = 1 / 10;
    const baseYSpeed = 1 / 15;

    const boost = useRef(0);
    const yDirection = useRef(-1);

    useEffect(() => {
        const onWheel = (e) => {
            const scrollDir = e.deltaY > 0 ? 1 : -1;
            if (yDirection.current !== scrollDir) {
                yDirection.current = scrollDir;
            }
            boost.current = Math.min(boost.current + 0.02, 1);
        };

        window.addEventListener("wheel", onWheel, { passive: true });
        return () => window.removeEventListener("wheel", onWheel);
    }, []);

    useFrame((_, delta) => {
        if (!ref.current) return;
        ref.current.rotation.x -= delta * baseXSpeed;
        ref.current.rotation.y -=
            delta * (baseYSpeed + boost.current) * yDirection.current;
        boost.current *= 0.95;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points
                ref={ref}
                positions={sphere}
                stride={3}
                frustumCulled
                {...props}
            >
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.002}
                    sizeAttenuation
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const StarCanvas = () => {
    return (
        <div className='w-full h-auto fixed inset-0 z-20'>
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Suspense fallback={null}>
                    <StarBackground />
                </Suspense>
            </Canvas>
        </div>
    )
}
export default StarCanvas;