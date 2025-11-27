import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

const ProcessedOption = ({ buttonTitle, popupTitle, popupContent }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex flex-col flex-1 justify-center items-center bg-black hover:drop-shadow-2xl hover:scale-105 transition-all duration-200 rounded-2xl cursor-pointer">
                    <p className='text-white'>{buttonTitle}</p>
                </div>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{popupTitle}</DialogTitle>
                </DialogHeader>

                <div className='max-h-[60dvh] overflow-auto'>
                    <p className='text-sm text-gray-500'>{popupContent}</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProcessedOption