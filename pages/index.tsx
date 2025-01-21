import React from 'react'
import CreateMemoryLaneForm from '../src/components/CreateMemoryLaneForm.tsx'
import Container from '../src/components/shared/Container.tsx'

const Index = () => {
  return (
    <Container className="pt-10">
      <div className='bg-white p-10 rounded-xl max-w-lg m-auto'>
        <h1 className='text-3xl font-bold mb-4'>Create a Memory Lane</h1>
        <CreateMemoryLaneForm />
      </div>
    </Container>
  )
}

export default Index
