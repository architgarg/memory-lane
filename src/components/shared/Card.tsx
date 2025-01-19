import React from 'react'
import classNames from 'classnames'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  padding?: 'sm' | 'md' | 'lg'
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md',
  ...props
}) => {
  const paddingClasses = {
    sm: 'p-2 sm:p-3 md:p-4 lg:p-5',
    md: 'px-4 py-5 sm:p-6 md:p-8 lg:p-10',
    lg: 'p-6 sm:p-8 md:p-10 lg:p-12',
  }
  const shadowClass = 'shadow rounded-lg bg-white'
  const classes = classNames(paddingClasses[padding], shadowClass, className)

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export default Card
