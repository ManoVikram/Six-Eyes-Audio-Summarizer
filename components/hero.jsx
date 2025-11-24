"use client"

import dynamic from 'next/dynamic'
import React from 'react'

const Player = dynamic(
    () => import("@lottiefiles/react-lottie-player").then(mod => mod.Player),
    { ssr: false }
)

const Hero = () => {
    return (
        <section className='flex flex-1 justify-between items-end h-full p-6 bg-gray-200/50 rounded-4xl'>
            <div className="flex flex-col gap-4">
                <p className="text-md text-gray-500">Turn Any Podcast Into Insight — Instantly.<br />AI-powered transcription, summarization & key-takeaways in seconds.</p>

                <p className="text-8xl font-bold">Listen Smarter,<br />Not Longer.</p>
            </div>

            <div className="relative -mb-11">
                <Player src="/podcast-illustration-lottie.json" autoplay loop />
            </div>
        </section>
    )
}

export default Hero