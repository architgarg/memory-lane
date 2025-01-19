import React from 'react'
import Button from './Button.tsx'

interface Props {
  icon: React.ElementType
}

const IconButton: React.FC<Props> = ({ icon: Icon }) => {
  return (
    <Button variant='outlined' className='!p-2 border-blue-500'>
      <Icon className='h-6 w-6 text-blue-500' />
    </Button>
  )
}

export default IconButton
