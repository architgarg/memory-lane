import React from 'react'
import MemoryPage from '../src/components/MemoryPage.tsx'
import { useRouter } from 'next/router'

const Main = () => {
  const router = useRouter()
  const { slug } = router.query

  return <MemoryPage slug={slug as string} />
}

export default Main
