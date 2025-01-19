import React from 'react'
import { Card, CardFooter, CardHeader } from '@heroui/card'
import { Image } from '@heroui/Image'
import { Button } from '@heroui/button'
import { Memory } from '../models/memory.ts'

interface Props {
  memory: Memory
}

const MemoryTile: React.FC<Props> = ({ memory }) => {
  return (
    <Card
      isFooterBlurred
      className='w-full h-[300px]'
    >
      <CardHeader className='absolute z-10 top-0 flex-col items-start bg-gradient-to-b from-black to-transparent'>
        <p className='text-tiny text-white/60 uppercase font-bold'>
          {new Date(memory.timestamp).toLocaleDateString()}
        </p>
        <h4 className='text-white/90 font-medium text-xl'>{memory.title}</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt='Relaxing app background'
        className='z-0 w-full h-full object-cover'
        src={memory.images[0]}
      />
      <CardFooter className='absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600'>
        <p className='text-tiny text-white/60'>{memory.description}</p>
        <Button radius='full' size='sm'>
          Show
        </Button>
      </CardFooter>
    </Card>
  )
}

export default MemoryTile
