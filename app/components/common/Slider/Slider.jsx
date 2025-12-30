"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import React from "react";

export default function Slider({
    children,
    showDots = false,
    autoPlay = false,
    autoPlayInterval = 3000,
    loop = true,
}) {
    const childrenArray = React.Children.toArray(children);
    const total = childrenArray.length;
    const [index, setIndex] = useState(0);
    const containerRef = useRef(null);

    const next = () =>
        setIndex((prev) => (loop ? (prev + 1) % total : Math.min(prev + 1, total - 1)));

    const prev = () =>
        setIndex((prev) => (loop ? (prev - 1 + total) % total : Math.max(prev - 1, 0)));

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [loop, total]);

    useEffect(() => {
        if (!autoPlay) return;
        const interval = setInterval(next, autoPlayInterval);
        return () => clearInterval(interval);
    }, [autoPlay, autoPlayInterval, loop, total]);

    const hidePrev = !loop && index === 0;
    const hideNext = !loop && index === total - 1;

    return (
        <div ref={containerRef} className="relative w-full z-40 overflow-hidden select-none">
            <motion.div
                className="flex"
                animate={{ x: `-${index * 100}%` }}
                transition={{ duration: 0.4 }}
            >
                {childrenArray.map((child, i) => (
                    <div key={i} className="w-full shrink-0 px-1 md:px-4">
                        {child}
                    </div>
                ))}
            </motion.div>

            <button
                onClick={prev}
                className={`
                    absolute top-1/2 -left-4 -translate-y-1/2 p-2 rounded-full
                    transition-opacity duration-300
                    ${hidePrev ? "opacity-0 pointer-events-none" : "opacity-100"}
                `}
            >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                    <path d="M16 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>

            <button
                onClick={next}
                className={`
                    absolute top-1/2 -right-4 -translate-y-1/2 p-2 rounded-full
                    transition-opacity duration-300
                    ${hideNext ? "opacity-0 pointer-events-none" : "opacity-100"}
                `}
            >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>

            {showDots && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {childrenArray.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`w-3 h-3 rounded-full transition-all ${i === index ? "bg-black scale-110" : "bg-gray-400 opacity-50"
                                }`}
                        ></button>
                    ))}
                </div>
            )}
        </div>
    );
}
