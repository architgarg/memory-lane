import React from 'react'
import { Button, Card, CardFooter, CardHeader, Image } from '@heroui/react'
import { MemorySchema } from '../schemas/memory.schema.ts'

interface Props {
  memory: MemorySchema
}

const MemoryTile: React.FC<Props> = ({ memory }) => {
  return (
    <Card isFooterBlurred className='w-full h-[300px] cursor-pointer'>
      <CardHeader className='absolute z-10 top-0 flex-col items-start bg-gradient-to-b from-black to-transparent'>
        <p className='text-tiny text-white/60 uppercase font-bold'>
          {new Date(memory.timestamp).toLocaleDateString()}
        </p>
        <h4 className='text-white/90 font-medium text-xl'>{memory.title}</h4>
      </CardHeader>
      <Image
        removeWrapper
        isZoomed
        alt='Memory Image'
        className='z-0 w-full h-full object-cover'
        src={memory.images[0]}
      />
      <CardFooter className='absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 flex gap-4 justify-between'>
        <p className='text-tiny text-white/90 line-clamp-2'>
          {memory.description}
        </p>
        <Button radius='full' size='sm' color='primary'>
          View
        </Button>
      </CardFooter>
    </Card>
  )
}

export default MemoryTile
