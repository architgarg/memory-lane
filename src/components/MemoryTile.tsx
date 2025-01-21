import React from 'react'
import { Image } from '@heroui/react'
import { MemorySchema } from '../schemas/memory.schema.ts'

interface Props {
  memory: MemorySchema
}

const MemoryTile: React.FC<Props> = ({ memory }) => {
  return (
    <div className='flex flex-col w-full shadow-lg bg-white rounded-xl p-6 min-h-[100px] cursor-pointer hover:shadow-md transition-all hover:scale-[1.01]'>
      <div>
        <p className='font-display text-3xl flex-1'>{memory.title}</p>
        <p className='text-sm line-clamp-2 mt-2'>{memory.description}</p>
      </div>

      <div className='flex justify-between items-end w-full mt-6'>
        <div className='flex gap-2'>
          <div className='rounded-full border text-xs px-2 py-1'>
            {new Date(memory.timestamp).toDateString()}
          </div>
          <div className='rounded-full border text-xs px-2 py-1'>
            {memory.images.length} pictures
          </div>
        </div>

        <div className='flex gap-2'>
          {memory.images.slice(0, 2).map((image, index) => (
            <Image
              key={index}
              alt={`Memory Image ${index}`}
              className='object-cover w-12 h-12'
              src={image}
            />
          ))}
          {memory.images.length > 2 && (
            <div className='flex items-center justify-center rounded-2xl'>
              <span className='text-sm text-gray-600'>
                +{memory.images.length - 2}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MemoryTile
