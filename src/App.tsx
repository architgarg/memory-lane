import './App.css'
import Card from './components/shared/Card.tsx'
import H1 from './components/shared/H1.tsx'
import AppLogo from './components/shared/AppLogo.tsx'
import Container from './components/shared/Container.tsx'
import {
  EllipsisVerticalIcon,
  PlusIcon,
  ShareIcon,
} from '@heroicons/react/20/solid'
import IconButton from './components/shared/IconButton.tsx'
import { Select, SelectItem } from '@heroui/select'
import { Button } from '@heroui/button'
import MemoryTile from './components/MemoryTile.tsx'
import { useEffect, useState } from 'react'
import { memoryLanesService } from './services/memory-lane.service.ts'
import { memoriesService } from './services/memory.service.ts'
import { Memory } from './models/memory.ts'
import { MemoryLane } from './models/memory-lane.ts'

function App() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [memoryLane, setMemoryLane] = useState<MemoryLane>()

  const memoryLaneId = '1'

  useEffect(() => {
    const fetchMemories = async () => {
      const { memoryLane } = await memoryLanesService.getById(memoryLaneId)
      const { memories } = await memoriesService.getByMemoryLaneId(memoryLaneId)

      setMemoryLane(memoryLane)
      setMemories(memories)
    }

    fetchMemories()
  }, [])

  return (
    <Container className='mt-20 space-y-16'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          <AppLogo />
          <H1>{memoryLane?.user_name}'s Memory lane</H1>
        </div>

        <IconButton icon={ShareIcon} />
      </div>

      <Card>{memoryLane?.description}</Card>

      <div className='flex items-center justify-between'>
        <Select
          className='max-w-[200px]'
          variant='bordered'
          onChange={(e) => console.log(e.target.value)}
          aria-label='Sort memories'
          defaultSelectedKeys={['desc']}
        >
          <SelectItem key='asc'>Older to new</SelectItem>
          <SelectItem key='desc'>New to older</SelectItem>
        </Select>

        <Button
          variant='bordered'
          startContent={<PlusIcon className='h-6 w-6' />}
        >
          New memory
        </Button>
      </div>

      <div className='max-w-lg m-auto space-y-4'>
        {memories.map((memory, index) => (
          <>
            <MemoryTile key={memory.id} memory={memory} />
            {index < memories.length && (
              <div className='flex justify-center items-center'>
                <EllipsisVerticalIcon className='h-6 w-6 text-gray-500' />
              </div>
            )}
          </>
        ))}
      </div>
    </Container>
  )
}

export default App
