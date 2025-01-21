import React from 'react'
import classNames from 'classnames'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Container: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <div
      className={classNames('mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 min-h-screen', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export default Container
