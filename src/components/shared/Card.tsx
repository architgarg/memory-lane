import React from 'react'
import classNames from 'classnames'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  const defaultPadding = 'p-4'
  const shadowClass = 'shadow-lg rounded-lg bg-white'

  const classes = classNames(defaultPadding, shadowClass, className)

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export default Card
