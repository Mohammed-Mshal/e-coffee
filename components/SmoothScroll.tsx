'use client'

import { usePathname } from '@/i18n/routing';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import React, { useRef } from 'react'
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const smootherWrapperRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useGSAP(() => {
        ScrollSmoother.create({
            smooth: 1,
            effects: true,
        });
    }, {
        dependencies: [pathname],
        revertOnUpdate: true,
    })
    return (
        <div id="smooth-wrapper" ref={smootherWrapperRef}>
            <div id="smooth-content">
                {children}
            </div>
        </div>
    )
}
