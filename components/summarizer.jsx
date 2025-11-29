"use client"

import { processPodcast } from '@/backend/services/lib/api/helpers'
import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import ProcessedOption from './processedOption'

const Player = dynamic(
    () => import("@lottiefiles/react-lottie-player").then(mod => mod.Player),
    { ssr: false }
)

const Summarizer = () => {
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [generateBlogPost, setGenerateBlogPost] = useState(false)
    const [generateAudioSummary, setGenerateAudioSummary] = useState(false)
    const [output, setOutput] = useState({
        transcript: "",
        summary: "",
        bulletPoints: [],
        blogPost: "",
        summaryAudio: ""
    })

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

        if (selectedFile) setFile(selectedFile)
    }

    const processAudio = async () => {
        if (file) {
            setIsProcessing(true)

            const response = await processPodcast(file, file.name.split(".").pop(), generateBlogPost, generateAudioSummary)

            setOutput({
                transcript: response.transcript,
                summary: response.summary_paragraph,
                bulletPoints: response.bullet_points,
                blogPost: response.blog_post,
                summaryAudio: response.summary_audio_b64,
            })

            console.log(response);

            console.log(output);
            

            setIsProcessing(false)
        } else { }
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
                            <Image src="/upload-audio-illustration.svg" alt='upload-audio' loading='eager' height={64} width={64} />

                            <p className='text-sm text-gray-500'>Drop your podcast. I&apos;ll summarize it.</p>
                        </>
                    )}
                </div>

                <div className="flex justify-between items-center w-2/4 -m-3 gap-2">
                    <label className='flex justify-start items-center w-full rounded-2xl px-4 py-2 border-2 gap-2 cursor-pointer'>
                        <input type="checkbox" name="generate-blog-post" className='appearance-none w-5 h-5 border-2 border-gray-300 rounded checked:bg-green-700 checked:border-green-700 relative after:content-["✓"] after:absolute after:text-white after:text-sm after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:opacity-0 checked:after:opacity-100 cursor-pointer' onChange={(event) => setGenerateBlogPost(event.target.checked)} />

                        <p>Generate Blog Post</p>
                    </label>

                    <label className='flex justify-start items-center w-full rounded-2xl px-4 py-2 border-2 gap-2 cursor-pointer'>
                        <input type="checkbox" name="generate-blog-post" className='appearance-none w-5 h-5 border-2 border-gray-300 rounded checked:bg-green-700 checked:border-green-700 relative after:content-["✓"] after:absolute after:text-white after:text-sm after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:opacity-0 checked:after:opacity-100 cursor-pointer' onChange={(event) => setGenerateAudioSummary(event.target.checked)} />

                        <p>Generate Audio Summary</p>
                    </label>
                </div>

                <button className='flex justify-center items-center w-2/4 p-3 bg-black text-white hover:drop-shadow-2xl hover:scale-105 transition-all duration-200 rounded-xl cursor-pointer' onClick={processAudio} disabled={isProcessing}>
                    {isProcessing ? <Loader2 className='animate-spin transition-all' /> : <p>Process</p>}
                </button>
            </div>

            <div className="flex flex-1 rounded-3xl gap-4">
                <ProcessedOption buttonTitle="View Transcript" popupTitle="Transcript" popupContent={output.transcript} />

                <ProcessedOption buttonTitle="View Summary" popupTitle="Summary" popupContent={output.summary} />

                <ProcessedOption buttonTitle="View Bullet Points" popupTitle="Bullet Points" popupContent={output.bulletPoints} />

                <ProcessedOption buttonTitle="View Blog Post" popupTitle="Blog Post" popupContent={output.blogPost} />

                <ProcessedOption buttonTitle="Listen to Summary Audio" popupTitle="Summary Audio" popupContent={output.summaryAudio} isAudio />
            </div>
        </section>
    )
}

export default Summarizer