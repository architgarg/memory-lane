import { CubeIcon } from '@heroicons/react/20/solid'
import './App.css'
import Card from './components/shared/Card.tsx'

function App() {
  return (
    <div>
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8 mt-32'>
        <Card className='px-4 py-5 sm:p-6'>
          <div className='flex items-center'>
            <CubeIcon className='h-16 w-16 inline-block' />
            <h1 className='text-4xl font-semibold text-gray-900 mb-4 ml-4 mt-4'>
              Dan's Memory lane
            </h1>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default App
