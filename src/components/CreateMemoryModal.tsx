import { XMarkIcon } from '@heroicons/react/20/solid'
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
} from '@heroui/react'
import { ChangeEvent, useMemo, useState } from 'react'
import { useCreateMemory } from '../hooks/useCreateMemory.tsx'

interface FormData {
  title: string
  description: string
  timestamp: string
}

interface Props {
  slug: string
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export default function CreateMemoryModal({
  slug,
  isOpen,
  onOpenChange,
}: Props) {
  const [data, setData] = useState<FormData>({
    title: '',
    description: '',
    timestamp: '',
  })
  const [pickedImageFiles, setPickedImageFiles] = useState<File[]>([])
  const { mutateAsync: createMemory, isLoading: uploading } = useCreateMemory()

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setPickedImageFiles((oldFiles) => [...oldFiles, ...files])
  }

  const previewImageUrls = useMemo(() => {
    return pickedImageFiles.map((file) => URL.createObjectURL(file))
  }, [pickedImageFiles])

  const handleDeleteImage = (index: number) => {
    setPickedImageFiles((oldFiles) => oldFiles.filter((_, i) => i !== index))
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((oldData) => ({
      ...oldData,
      [name]: value,
    }))
  }

  const handleCreateMemory = async (onClose: () => void) => {
    if (uploading) return
    await createMemory({
      slug,
      title: data.title,
      description: data.description,
      timestamp: data.timestamp,
      pickedImageFiles,
    })
    onClose()
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
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Create a new Memory
              </ModalHeader>
              <ModalBody>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleCreateMemory(onClose)
                  }}
                  validationBehavior='native'
                >
                  <Input
                    isRequired
                    name='title'
                    label='Name'
                    placeholder='Name your memory'
                    variant='bordered'
                    value={data.title}
                    onChange={onChangeHandler}
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
                  <DatePicker
                    isRequired
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

                  {previewImageUrls.length > 0 && (
                    <div className='mt-2'>
                      <label className='text-small text-foreground-700 mb-2 block'>
                        Selected Images
                      </label>
                      <div className='grid grid-cols-4 gap-4'>
                        {previewImageUrls.map((image, index) => (
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

                  <div className='mt-4 w-full'>
                    <Input
                      label='Pick memories from gallery'
                      type='file'
                      accept='image/*'
                      multiple
                      onChange={handleFileChange}
                      isRequired
                    />
                  </div>

                  <div className='ml-auto mb-4 mt-4'>
                    <Button color='primary' type='submit' disabled={uploading}>
                      {uploading ? 'Uploading images...' : 'Create memory'}
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
