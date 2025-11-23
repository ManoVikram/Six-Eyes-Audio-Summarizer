import Image from 'next/image'
import React from 'react'

const Navbar = () => {
    return (
        <nav className='fixed top-10 left-10 right-10 z-50 p-2'>
            <div className="flex justify-between items-center">
                <div className="flex justify-between items-center py-1 pl-1 pr-4 gap-2 bg-white rounded-full">
                    <div className="flex justify-center items-center p-1.5 rounded-full bg-black">
                        <Image src="/logo.svg" alt='logo' height={18} width={18} />
                    </div>

                    <p>Podcast Summarizer</p>
                </div>

                <div className="flex justify-between items-center py-1.5 px-1.5 bg-white rounded-full">
                    <button className="flex justify-center items-center rounded-full px-4 py-1 bg-black cursor-pointer">
                        <p className='text-white'>Home</p>
                    </button>

                    <button className="flex justify-center items-center rounded-full px-4 py-1 bg-transparent cursor-pointer">
                        <p className='text-black'>Summarizer</p>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar