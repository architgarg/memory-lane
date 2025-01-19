import './App.css'
import Card from './components/shared/Card.tsx'
import H1 from './components/shared/H1.tsx'
import AppLogo from './components/shared/AppLogo.tsx'
import Container from './components/shared/Container.tsx'
import { ShareIcon } from '@heroicons/react/20/solid'
import IconButton from './components/shared/IconButton.tsx'

function App() {
  return (
    <Container className='mt-20'>
      <div className='flex justify-between items-center mb-10'>
        <div className='flex items-center'>
          <AppLogo />
          <H1>Dan's Memory lane</H1>
        </div>

        <IconButton icon={ShareIcon} />
      </div>

      <Card>
        Jae Doe's journey has been a tapestry of curiosity and exploration. From
        a young age, their inquisitive mind led them through diverse interests.
        Education shaped their multidisciplinary perspective, while personal
        experiences added depth and resilience to their story. Embracing
        challenges and cherishing relationships, Jae continues to craft a unique
        and inspiring life history.
      </Card>
    </Container>
  )
}

export default App
