'use client'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const route = useRouter()
    return (
        <div className='flex justify-center'>
            <div className='max-w-3xl w-full bg-gray-700 flex justify-between px-5 py-3 items-center rounded-xl'>
                <h1 onClick={() => route.push('/')} className='text-white font-bold text-2xl cursor-pointer'>CRUD Topics</h1>
                <Button onClick={() => route.push('/addtopic')} className='bg-white text-black hover:text-white'>Add Topic</Button>
            </div>
        </div>
    )
}

export default Navbar