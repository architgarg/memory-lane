import './App.css'
import Card from './components/shared/Card.tsx'
import H1 from './components/shared/H1.tsx'
import AppLogo from './components/shared/AppLogo.tsx'

function App() {
  return (
    <div className='mx-auto max-w-7xl sm:px-6 lg:px-8 mt-20'>
      <Card className='px-4 py-5 sm:p-6'>
        <div className='flex items-center'>
          <AppLogo />
          <H1>Dan's Memory lane</H1>
        </div>
      </Card>
    </div>
  )
}

export default App
