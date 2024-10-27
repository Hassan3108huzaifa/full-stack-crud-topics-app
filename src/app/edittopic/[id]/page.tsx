'use client'

import EditTopicForm from '@/components/EditTopicForm'
import React, { useEffect, useState } from 'react'
import { Topic } from '@/app/types/topics'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const getTopicById = async (id: string): Promise<Topic | null> => {
  try {
    const res = await fetch(`/api/topics/${id}`, {
      cache: 'no-store'
    });
    if (!res.ok) {
      throw new Error("Failed to fetch Topic");
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function EditTopicPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [topic, setTopic] = useState<Topic | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    getTopicById(id)
      .then(setTopic)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    )
  }

  if (!topic) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h1 className="text-2xl font-bold mb-4">Topic not found</h1>
        <button 
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Go back to topics
        </button>
      </div>
    )
  }

  return (
    <div>
      <EditTopicForm id={id} title={topic.title} description={topic.description} />
    </div>
  )
}