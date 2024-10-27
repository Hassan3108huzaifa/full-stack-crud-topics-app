'use client'
import React, { FormEvent, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const TopicForm = () => {
  const router = useRouter()
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Title and Description are required!")
      return;
    }
    try {
      const response = await fetch('/api/topics', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, description })
      })
      if(response.ok){
        router.push('/')
        router.refresh()
      }else{
        throw new Error("Failed to add Topic")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex justify-center'>
      <form onSubmit={handleSubmit} className='max-w-3xl w-full rounded-xl'>
        <Input onChange={(e) => setTitle(e.target.value)} value={title} className='border-gray-500 border-2 ' placeholder='Enter Title' />
        <Input onChange={(e) => setDescription(e.target.value)} value={description} className='border-gray-500 border-2 my-5' placeholder='Enter Description..' />
        <div className=''>
          <Button type='submit' className=''>Add Topic</Button>
        </div>
      </form>
    </div>
  )
}

export default TopicForm