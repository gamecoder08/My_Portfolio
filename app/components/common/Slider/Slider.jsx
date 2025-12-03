"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import React from "react";

export default function Slider({ children }) {
    const childrenArray = React.Children.toArray(children);
    const [index, setIndex] = useState(0);

    const next = () => {
        if (index < childrenArray.length - 1) setIndex(index + 1);
    };

    const prev = () => {
        if (index > 0) setIndex(index - 1);
    };

    return (
        <div className="relative w-full z-90 overflow-hidden">
            <motion.div
                className="flex"
                animate={{ x: `-${index * 100}%` }}
                transition={{ duration: 0.4 }}
            >
                {childrenArray.map((child, i) => (
                    <div key={i} className="w-full shrink-0 px-4">
                        {child}
                    </div>
                ))}
            </motion.div>

            <button
                onClick={prev}
                disabled={index === 0}
                className={`
                    absolute top-1/2 -left-2 -translate-y-1/2 p-2 rounded-full
                    transition-opacity duration-300
                    ${index === 0 ? "opacity-0 pointer-events-none" : "opacity-100"}
                `}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M16 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>

            <button
                onClick={next}
                disabled={index === childrenArray.length - 1}
                className={`
                    absolute top-1/2 -right-2 -translate-y-1/2 p-2 rounded-full
                    transition-opacity duration-300
                    ${index === childrenArray.length - 1 ? "opacity-0 pointer-events-none" : "opacity-100"}
                `}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>
        </div>
    );
}
