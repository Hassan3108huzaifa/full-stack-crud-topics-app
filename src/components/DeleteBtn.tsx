'use client'

import { HiOutlineTrash } from "react-icons/hi"
import { useRouter } from "next/navigation"

export default function DeleteBtn({ id, onDelete }: { id: string; onDelete: (id: string) => void }) {
  const router = useRouter()

  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?")

    if (confirmed) {
      const res = await fetch(`/api/topics/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        onDelete(id)
        router.refresh()
      }
    }
  }

  return (
    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  )
}