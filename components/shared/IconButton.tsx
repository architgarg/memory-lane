import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ElementType
}

const IconButton: React.FC<Props> = ({ icon: Icon, ...props }) => {
  return (
    <button
      className='rounded-lg focus:outline-none p-2 border border-blue-500 bg-white hover:bg-blue-50 transition-all'
      {...props}
    >
      <Icon className='h-6 w-6 text-blue-500' />
    </button>
  )
}

export default IconButton
