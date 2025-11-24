"use client"

import { Player } from '@lottiefiles/react-lottie-player'
import Image from 'next/image'
import React from 'react'

const Summarizer = () => {
    return (
        <section className='flex flex-col flex-1 p-6 pt-22 bg-gray-200/50 rounded-4xl gap-6'>
            <div className="flex flex-col flex-6 justify-between items-center w-full p-6 bg-white rounded-4xl gap-8">
                {/* <Player src="/audio-lottie.json" className='h-32 w-32' autoplay loop /> */}
                <div className="flex flex-col flex-1 justify-center items-center w-2/4 border-4 border-dotted rounded-2xl gap-4 cursor-pointer">
                    <Image src="/upload-audio-illustration.svg" alt='upload-audio' height={64} width={64} />

                    <p className='text-sm text-gray-500'>Drop your podcast. I&apos;ll summarize it.</p>
                </div>

                <button className='flex justify-center items-center w-2/4 p-3 bg-black text-white hover:drop-shadow-2xl hover:scale-105 transition-all duration-200 rounded-xl cursor-pointer'>
                    Process
                </button>
            </div>

            <div className="flex flex-1 rounded-3xl gap-4">
                <div className="flex flex-col flex-1 justify-center items-center bg-black hover:drop-shadow-2xl hover:scale-105 transition-all duration-200 rounded-2xl cursor-pointer">
                    <p className='text-white'>View Transcript</p>
                </div>

                <div className="flex flex-col flex-1 justify-center items-center bg-black hover:drop-shadow-2xl hover:scale-105 transition-all duration-200 rounded-2xl cursor-pointer">
                    <p className='text-white'>View Bullet Points</p>
                </div>

                <div className="flex flex-col flex-1 justify-center items-center bg-black hover:drop-shadow-2xl hover:scale-105 transition-all duration-200 rounded-2xl cursor-pointer">
                    <p className='text-white'>View Summary</p>
                </div>

                <div className="flex flex-col flex-1 justify-center items-center bg-black hover:drop-shadow-2xl hover:scale-105 transition-all duration-200 rounded-2xl cursor-pointer">
                    <p className='text-white'>View Blog Post</p>
                </div>

                <div className="flex flex-col flex-1 justify-center items-center bg-black hover:drop-shadow-2xl hover:scale-105 transition-all duration-200 rounded-2xl cursor-pointer">
                    <p className='text-white'>Listen to Summary Audio</p>
                </div>
            </div>
        </section>
    )
}

export default Summarizer