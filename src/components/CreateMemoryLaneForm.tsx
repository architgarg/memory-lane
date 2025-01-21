import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Input, Textarea } from '@heroui/react'
import { textToSlug } from '../utils.ts'
import { memoryLanesService } from '../services/memory-lane.service.ts'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

interface Props {
  onSuccess?: () => void
}

interface FormData {
  name: string
  description: string
  slug: string
}

const CreateMemoryLaneForm: React.FC<Props> = ({ onSuccess }) => {
  const router = useRouter()

  const [data, setData] = useState<FormData>({
    name: '',
    slug: '',
    description: '',
  })
  const [loading, setLoading] = useState<boolean>(false)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((oldData) => ({
      ...oldData,
      [name]: value,
    }))
  }

  const handleCreateMemoryLane = async () => {
    if (loading) return

    try {
      setLoading(true)
      await memoryLanesService.create(data.name, data.slug, data.description)
      await router.push(`/${data.slug}`)

      onSuccess?.()
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : 'Failed to create memory lane'

      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        handleCreateMemoryLane()
      }}
      validationBehavior='native'
    >
      <Input
        isRequired
        name='name'
        label='Name'
        placeholder='Enter your first name'
        variant='bordered'
        value={data.name}
        onChange={(e) => {
          const name = e.target.value
          const slug = textToSlug(name)

          setData((oldData) => ({
            ...oldData,
            name,
            slug,
          }))
        }}
      />
      <Input
        isRequired
        name='slug'
        label='Slug'
        placeholder='Enter your first name'
        variant='bordered'
        value={data.slug}
        onChange={onChangeHandler}
        description={`Your url will look like: https://planned.com/${data.slug}`}
      />
      <Textarea
        isRequired
        name='description'
        label='Description'
        placeholder='Enter your memory description'
        variant='bordered'
        value={data.description}
        onChange={onChangeHandler}
      />

      <div className='ml-auto mb-6'>
        <Button color='primary' disabled={loading} type='submit'>
          {loading ? 'Creating...' : 'Create'}
        </Button>
      </div>
    </Form>
  )
}

export default CreateMemoryLaneForm
