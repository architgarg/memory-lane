import React from 'react'
import classNames from 'classnames'

interface ButtonProps {
  variant?: 'outlined' | 'filled' | 'text'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant = 'outlined',
  size = 'md',
  disabled = false,
  onClick,
  children,
}) => {
  const baseStyles = 'rounded focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variantStyles = {
    outlined: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50',
    filled: 'bg-blue-600 text-white hover:bg-blue-700',
    text: 'text-blue-600 hover:text-blue-700',
  }
  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }
  const disabledStyles = 'opacity-50 cursor-not-allowed'

  const classes = classNames(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    { [disabledStyles]: disabled }
  )

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button