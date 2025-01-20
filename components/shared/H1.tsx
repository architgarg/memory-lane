import React from 'react'

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

const H1: React.FC<Props> = ({ children, ...props }) => {
  return (
    <h1
      className='text-4xl font-semibold text-gray-900 mb-4 ml-4 mt-4'
      {...props}
    >
      {children}
    </h1>
  )
}

export default H1
