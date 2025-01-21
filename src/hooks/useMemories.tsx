import { useState, useMemo } from 'react'
import { useQuery } from 'react-query'
import { memoriesService } from '../services/memory.service.ts'

export const useMemories = (slug: string) => {
  const [memoriesSortOrder, setMemoriesSortOrder] = useState<'desc' | 'asc'>(
    'desc',
  )

  const { data } = useQuery(
    ['memories', slug],
    () => memoriesService.getByMemoryLaneSlug(slug),
    {
      enabled: !!slug,
      onError: (error) => {
        console.error(error)
      },
      onSuccess: (data) => {
        console.log('data', data)
      }
    },
  )

  const memories = useMemo(() => data?.memories || [], [data])
  const memoryLane = data?.memoryLane

  const sortedMemories = useMemo(() => {
    return memories.sort(
      (a, b) =>
        (memoriesSortOrder === 'asc' ? 1 : -1) *
        (new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
    )
  }, [memories, memoriesSortOrder])

  return {
    memories: sortedMemories,
    memoryLane,
    memoriesSortOrder,
    setMemoriesSortOrder,
  }
}
