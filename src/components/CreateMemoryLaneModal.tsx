import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from '@heroui/react'
import React, { ChangeEvent, useState } from 'react'
import { memoryLanesService } from '../services/memory-lane.service.ts'
import { useRouter } from 'next/router'
import { textToSlug } from '../utils.ts'

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

    await memoryLanesService.create(data.name, data.slug, data.description)
    await router.push(`/${data.slug}`)

    setLoading(false)
    onClose()
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
                <Input
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
                  name='slug'
                  label='Slug'
                  placeholder='Enter your first name'
                  variant='bordered'
                  value={data.slug}
                  onChange={onChangeHandler}
                  description={`Your url will look like: https://planned.com/${data.slug}`}
                />
                <Textarea
                  name='description'
                  label='Description'
                  placeholder='Enter your memory description'
                  variant='bordered'
                  value={data.description}
                  onChange={onChangeHandler}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color='primary'
                  onPress={() => {
                    handleCreateMemoryLane(onClose)
                  }}
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
