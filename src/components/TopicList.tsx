'use client'

import React from 'react'
import { HiPencilAlt } from 'react-icons/hi'
import DeleteBtn from './DeleteBtn'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Topic } from '../app/types/topics'

const getTopics = async (): Promise<Topic[]> => {
  const response = await fetch('/api/topics', { cache: "no-store" })
  if (!response.ok) {
    throw new Error("Failed to fetch Topics")
  }
  return response.json()
}

export default function TopicList() {
  const [topics, setTopics] = React.useState<Topic[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const router = useRouter()

  React.useEffect(() => {
    getTopics()
      .then(data => {
        if (Array.isArray(data) && data.every(isValidTopic)) {
          setTopics(data)
        } else {
          setError('Received invalid data from the server')
        }
      })
      .catch(err => {
        console.error(err)
        setError('Failed to fetch topics')
      })
      .finally(() => setLoading(false))
  }, [])

  // Function to remove deleted topic from the list
  const handleDelete = (id: string) => {
    setTopics(prevTopics => prevTopics.filter(topic => topic.id !== id))
  }

  // Function to validate a single topic
  const isValidTopic = (topic: Topic): topic is Topic => {
    return (
      typeof topic === 'object' &&
      typeof topic.id === 'string' &&
      typeof topic.title === 'string' &&
      typeof topic.description === 'string'
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      {topics.length === 0 ? (
        <p>No topics found.</p>
      ) : (
        topics.map(t => (
          <div key={t.id} className="max-w-3xl w-full flex justify-between px-5 py-3 items-center rounded-xl border border-input mb-4 bg-card text-card-foreground shadow-sm">
            <div className="max-w-2xl flex flex-col gap-2">
              <h2 className="text-2xl font-bold">{t.title}</h2>
              <p>{t.description}</p>
            </div>
            <div className="flex gap-3">
              <DeleteBtn id={t.id} onDelete={handleDelete} />
              <HiPencilAlt 
                onClick={() => router.push(`/edittopic/${t.id}`)} 
                size={24} 
                className="cursor-pointer text-muted-foreground hover:text-primary transition-colors" 
              />
            </div>
          </div>
        ))
      )}
    </div>
  )
}