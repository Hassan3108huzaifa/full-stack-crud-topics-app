'use client'
import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface EditTopicFormProps {
  id: string,
  title: string,
  description: string
}

const EditTopicForm = ({ id, title, description }: EditTopicFormProps) => {
  const router = useRouter();

  const [newTitle, setNewTitle] = useState<string>(title);
  const [newDescription, setNewDescription] = useState<string>(description);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: "PUT",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({ title: newTitle, description: newDescription })
      })
      if(!res.ok){
        throw new Error("Failed to Edit Topic")
      }
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error(error)
      setError("Failed to edit topic. Please try again.")
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <form onSubmit={handleEdit} className='max-w-3xl w-full rounded-xl'>
        <Input onChange={(e) => setNewTitle(e.target.value)} value={newTitle} className='border-gray-500 border-2 ' placeholder='Enter Title' />
        <Input onChange={(e) => setNewDescription(e.target.value)} value={newDescription} className='border-gray-500 border-2 my-5' placeholder='Enter Description..' />
        <div className=''>
          <Button type='submit' className=''>Update Topic</Button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  )
}

export default EditTopicForm