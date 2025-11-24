"use client"

import React from 'react'

const Summarizer = () => {
    return (
        <section className='flex flex-col flex-1 p-6 pt-22 bg-gray-200/50 rounded-4xl gap-6'>
            <div className="flex flex-col flex-6 bg-white rounded-3xl">

            </div>

            <div className="flex flex-1 rounded-3xl gap-4">
                <div className="flex flex-col flex-1 justify-center items-center bg-black hover:drop-shadow-2xl hover:scale-105 transition-all duration-200 rounded-2xl cursor-pointer">
                    <p className='text-sm text-gray-200 font-bold'>View Transcript</p>
                </div>

                <div className="flex flex-col flex-1 justify-center items-center bg-black hover:drop-shadow-2xl hover:scale-105 transition-all duration-200 rounded-2xl cursor-pointer">
                    <p className='text-sm text-gray-200 font-bold'>View Bullet Points</p>
                </div>

                <div className="flex flex-col flex-1 justify-center items-center bg-black hover:drop-shadow-2xl hover:scale-105 transition-all duration-200 rounded-2xl cursor-pointer">
                    <p className='text-sm text-gray-200 font-bold'>View Summary</p>
                </div>

                <div className="flex flex-col flex-1 justify-center items-center bg-black hover:drop-shadow-2xl hover:scale-105 transition-all duration-200 rounded-2xl cursor-pointer">
                    <p className='text-sm text-gray-200 font-bold'>View Blog Post</p>
                </div>

                <div className="flex flex-col flex-1 justify-center items-center bg-black hover:drop-shadow-2xl hover:scale-105 transition-all duration-200 rounded-2xl cursor-pointer">
                    <p className='text-sm text-gray-200 font-bold'>Listen to Summary Audio</p>
                </div>
            </div>
        </section>
    )
}

export default Summarizer