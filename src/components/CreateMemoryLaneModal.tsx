import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
  useDisclosure,
} from '@heroui/react'
import React, { ChangeEvent, useState } from 'react'
import { memoryLanesService } from '../services/memory-lane.service.ts'
import { useRouter } from 'next/router'
import { textToSlug } from '../utils.ts'
import toast from 'react-hot-toast'

interface FormData {
  name: string
  description: string
  slug: string
}

interface Props {}

export default function CreateMemoryModal({}: Props) {
  const router = useRouter()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

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

  const handleCreateMemoryLane = async (onClose: () => void) => {
    if (loading) return

    try {
      setLoading(true)
      await memoryLanesService.create(data.name, data.slug, data.description)
      await router.push(`/${data.slug}`)

      onClose()
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : 'Failed to create memory lane'

      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='fixed bottom-10 right-10 z-10 flex'>
        <Button
          variant='flat'
          size='sm'
          className='bg-white shadow-lg'
          onPress={() => {
            setData({
              name: '',
              slug: '',
              description: '',
            })
            onOpen()
          }}
        >
          Create your own lane
        </Button>
      </div>
      <Modal
        size='2xl'
        scrollBehavior='inside'
        isOpen={isOpen}
        placement='top-center'
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Create a new Lane
              </ModalHeader>
              <ModalBody>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleCreateMemoryLane(onClose)
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

                  <div className="ml-auto mb-6">
                    <Button
                      color='primary'
                      disabled={loading}
                      type='submit'
                    >
                      {loading ? 'Creating...' : 'Create'}
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
