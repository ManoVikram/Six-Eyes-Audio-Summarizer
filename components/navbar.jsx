"use client"

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const Navbar = () => {
    const router = useRouter()
    const pathname = usePathname()

    const isHome = pathname === "/"
    const isSummarizer = pathname === "/summarizer"

    return (
        <nav className='fixed top-10 left-10 right-10 z-50 p-2'>
            <div className="flex justify-between items-center">
                <div className="flex justify-between items-center py-1 pl-1 pr-4 gap-2 bg-white rounded-full">
                    <div className="flex justify-center items-center p-1.5 rounded-full bg-black">
                        <Image src="/logo.svg" alt='logo' height={18} width={18} />
                    </div>

                    <p>Six Eyes Podcast Summarizer</p>
                </div>

                <div className="flex justify-between items-center py-1.5 px-1.5 bg-white rounded-full">
                    <button className={`flex justify-center items-center rounded-full px-4 py-1 ${isHome && "bg-black"} cursor-pointer`} onClick={() => router.push("/")}>
                        <p className={isHome ? "text-white" : "text-black"}>Home</p>
                    </button>

                    <button className={`flex justify-center items-center rounded-full px-4 py-1 ${isSummarizer && "bg-black"} cursor-pointer`} onClick={() => router.push("/summarizer")}>
                        <p className={isSummarizer ? "text-white" : "text-black"}>Summarizer</p>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar