import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

const ProcessedOption = ({ buttonTitle, popupTitle, popupContent, isAudio = false }) => {
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

                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>

                {!isAudio ? (
                    <div className='max-h-[60vh] overflow-auto'>
                        {Array.isArray(popupContent) ? (
                            <ul className='list-disc pl-5 space-y-2'>
                                {popupContent.map((points, index) => (
                                    <li key={index}>
                                        <p className='text-sm text-gray-500'>{points}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className='text-sm text-gray-500'>{popupContent}</p>
                        )}
                    </div>
                ) : (
                    <></>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default ProcessedOption