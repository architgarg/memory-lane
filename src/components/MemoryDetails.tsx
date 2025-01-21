import React from 'react'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import Container from './shared/Container.tsx'
import { Button, Image } from '@heroui/react'
import { MemoryLane } from '@prisma/client'
import { MemorySchema } from '../schemas/memory.schema.ts'

interface Props {
  onBack: () => void
  memoryLane: MemoryLane
  memory: MemorySchema | null
}

const MemoryDetails: React.FC<Props> = ({ memory, memoryLane, onBack }) => {
  if (!memory) return null

  return (
    <div className='bg-kabul-light w-full min-h-screen'>
      <Container>
        <div className='flex justify-between items-center p-4'>
          <div className='flex items-center'>
            <Button
              isIconOnly
              size='sm'
              className='bg-white shadow'
              onPress={onBack}
            >
              <ArrowLeftIcon className='w-4 h-4' />
            </Button>
            <span className='ml-4'>{memoryLane?.user_name}'s Memory lane</span>
          </div>
        </div>

        <div>
          <h1 className='text-5xl font-display text-center mt-10 text-kabul'>
            {memory.title}
          </h1>
          <p className='text-md text-center mt-4 text-kabul-600'>
            {new Date(memory.timestamp).toDateString()}
          </p>
          <p className='text-sm text-center mt-2 text-kabul-600'>
            {memory.images.length} pictures
          </p>
        </div>

        <div className='grid grid-cols-3 gap-10 p-4 pb-32 pt-10'>
          {memory.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Image ${index}`}
              className='w-full h-full object-cover shadow'
            />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default MemoryDetails
