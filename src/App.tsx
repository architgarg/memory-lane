import './App.css'
import Card from './components/shared/Card.tsx'
import H1 from './components/shared/H1.tsx'
import AppLogo from './components/shared/AppLogo.tsx'
import Container from './components/shared/Container.tsx'
import { ShareIcon } from '@heroicons/react/20/solid'
import IconButton from './components/shared/IconButton.tsx'
import Button from './components/shared/Button.tsx'
import { Select, SelectItem } from '@heroui/select'

function App() {
  return (
    <Container className='mt-20 space-y-20'>
      <div className='flex justify-between items-center'>
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

      <div className='flex items-center justify-between'>
        <Select
          className='max-w-[200px]'
          variant='bordered'
          onChange={(e) => console.log(e.target.value)}
          aria-label='Sort memories'
          defaultSelectedKeys={['desc']}
        >
          <SelectItem key='asc'>Older to new</SelectItem>
          <SelectItem key='desc'>New to older</SelectItem>
        </Select>

        <Button>New memory</Button>
      </div>
    </Container>
  )
}

export default App
