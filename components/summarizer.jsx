"use client"

import dynamic from 'next/dynamic'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

const Player = dynamic(
    () => import("@lottiefiles/react-lottie-player").then(mod => mod.Player),
    { ssr: false }
)

const Summarizer = () => {
    const [file, setFile] = useState(null)

    const inputFileRef = useRef(null)

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + " B"

        let kb = bytes / 1024
        if (kb < 1024) return kb.toFixed(2) + " KB"

        let mb = kb / 1024
        if (mb < 1024) return mb.toFixed(2) + " MB"

        let gb = mb / 1024
        return gb.toFixed(2) + " GB"
    }

    const openFileDialog = () => inputFileRef.current.click()

    const handleFilePick = (event) => {
        const selectedFile = event.target.files[0]

        setFile(selectedFile)
    }

    return (
        <section className='flex flex-col flex-1 p-6 pt-22 bg-gray-200/50 rounded-4xl gap-6'>
            <div className="flex flex-col flex-6 justify-between items-center w-full p-6 bg-white rounded-4xl gap-8">
                <div className="flex flex-col flex-1 justify-center items-center w-2/4 border-4 border-dotted rounded-2xl gap-4 cursor-pointer" onClick={openFileDialog}>
                    <input type="file" accept='audio/*' ref={inputFileRef} className='hidden h-full bg-red-300' onChange={handleFilePick} />

                    {file ? (
                        <>
                            <Player src="/audio-lottie.json" className='h-32 w-32' autoplay loop />

                            <p className='-mt-8 text-sm italic'>{file.name} - <span className='text-gray-400'>{formatFileSize(file.size)}</span></p>
                        </>
                    ) : (
                        <>
                            <Image src="/upload-audio-illustration.svg" alt='upload-audio' height={64} width={64} />

                            <p className='text-sm text-gray-500'>Drop your podcast. I&apos;ll summarize it.</p>
                        </>
                    )}
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