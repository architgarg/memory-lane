import React from 'react'
import classNames from 'classnames'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outlined' | 'filled' | 'text'
  size?: 'sm' | 'md' | 'lg'
}

const Button: React.FC<ButtonProps> = ({
  variant = 'outlined',
  size = 'md',
  disabled = false,
  children,
  className,
  ...props
}) => {
  const baseStyles =
    'rounded-lg focus:outline-none'
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
    { [disabledStyles]: disabled },
    className,
  )

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  )
}

export default Button
