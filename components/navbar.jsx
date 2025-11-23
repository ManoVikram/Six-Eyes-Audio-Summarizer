import Image from 'next/image'
import React from 'react'

const Navbar = () => {
    return (
        <nav className='fixed top-0 left-0 right-0 z-50 p-2'>
            <div className="flex justify-between items-center">
                <div className="flex justify-between items-center py-1 pl-1 pr-4 gap-2 bg-white rounded-full">
                    <div className="flex justify-center items-center p-1.5 rounded-full bg-black">
                        <Image src="/logo.svg" alt='logo' height={18} width={18} />
                    </div>

                    <p>Podcast Summarizer</p>
                </div>

                <div className="flex justify-between items-center py-1.5 px-1.5 bg-white rounded-full">
                    <div className="flex justify-center items-center rounded-full px-4 py-1 bg-black">
                        <p className='text-white'>Home</p>
                    </div>
                    
                    <div className="flex justify-center items-center rounded-full px-4 py-1 bg-transparent">
                        <p className='text-black'>Summarizer</p>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar