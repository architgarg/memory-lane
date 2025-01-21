import React from 'react'
import { CubeIcon } from '@heroicons/react/20/solid'

interface Props {}

const AppLogo: React.FC<Props> = () => {
  return <CubeIcon className='h-10 w-10 md:h-16 md:w-16 inline-block' />
}

export default AppLogo
