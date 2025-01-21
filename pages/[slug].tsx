import React from 'react'
import { useRouter } from 'next/router'
import MemoryLane from '../src/components/MemoryLane.tsx'

const Main = () => {
  const router = useRouter()
  const { slug } = router.query

  return <MemoryLane slug={slug as string} />
}

export default Main
