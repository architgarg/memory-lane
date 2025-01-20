import { PlusIcon } from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/20/solid'
import {
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Image,
} from '@heroui/react'
import { ChangeEvent, useState } from 'react'
import { memoriesService } from '../services/memory.service.ts'

interface FormData {
  title: string
  description: string
  timestamp: string
  images: string[]
}

interface Props {
  slug: string
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onSuccess: () => void
}

export default function CreateMemoryModal({
  slug,
  isOpen,
  onOpenChange,
  onSuccess,
}: Props) {
  const [data, setData] = useState<FormData>({
    title: '',
    description: '',
    timestamp: '',
    images: [],
  })

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const imageUrls = files.map((file) => URL.createObjectURL(file))
    setData((oldData) => ({
      ...oldData,
      images: [...oldData.images, ...imageUrls],
    }))
  }

  const handleDeleteImage = (index: number) => {
    setData((oldData) => ({
      ...oldData,
      images: oldData.images.filter((_, i) => i !== index),
    }))
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((oldData) => ({
      ...oldData,
      [name]: value,
    }))
  }

  const createMemory = async () => {
    await memoriesService.createMemory(
      slug,
      data.title,
      data.description,
      data.timestamp,
      data.images,
    )

    onSuccess()
    onOpenChange(false)
  }

  return (
    <>
      <Modal
        size='2xl'
        scrollBehavior='inside'
        isOpen={isOpen}
        placement='top-center'
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Create a new Memory
              </ModalHeader>
              <ModalBody>
                <Input
                  name='title'
                  label='Name'
                  placeholder='Name your memory'
                  variant='bordered'
                  value={data.title}
                  onChange={onChangeHandler}
                />
                <Textarea
                  name='description'
                  label='Description'
                  placeholder='Enter your memory description'
                  variant='bordered'
                  value={data.description}
                  onChange={onChangeHandler}
                />
                <DatePicker
                  name='timestamp'
                  label='Date'
                  variant='bordered'
                  onChange={(date) => {
                    setData((oldData) => ({
                      ...oldData,
                      timestamp: date?.toDate('IST')?.toISOString() || '',
                    }))
                  }}
                />

                {data.images.length > 0 && (
                  <div className='mt-2'>
                    <label className='text-small text-foreground-700 mb-2 block'>
                      Selected Images
                    </label>
                    <div className='grid grid-cols-4 gap-4'>
                      {data.images.map((image, index) => (
                        <div key={index} className='relative group'>
                          <Image
                            alt={`Image ${index + 1}`}
                            src={image}
                            height={100}
                            className='rounded-lg w-full relative'
                          />
                          <button
                            onClick={() => handleDeleteImage(index)}
                            className='absolute -top-1 -right-1 bg-red-500 rounded-full p-1 z-10 group-hover:opacity-100 opacity-0 transition-opacity'
                          >
                            <XMarkIcon className='h-4 w-4 text-white' />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className='duration-150 hover:border-default-400 border-default-200 border-medium focus-within:border-default-foreground focus-within:hover:border-default-foreground p-4 mt-4 rounded-lg cursor-pointer'>
                  <label className='flex gap-2 justify-center items-center w-full text-small text-foreground-700 cursor-pointer'>
                    <PlusIcon className='h-6 w-6 text-default-500' />
                    Pick memories from gallery
                    <input
                      type='file'
                      accept='image/*'
                      multiple
                      onChange={handleFileChange}
                      className='hidden'
                    />
                  </label>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='primary' onPress={createMemory}>
                  Create memory
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
