import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import {
  Button,
  DatePicker,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@heroui/react'
import { ChangeEvent, useMemo, useState } from 'react'
import { memoriesService } from '../services/memory.service.ts'
import { imageUploadService } from '../services/file.service.ts'

interface FormData {
  title: string
  description: string
  timestamp: string
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
  })
  const [uploading, setUploading] = useState<boolean>(false)
  const [pickedImageFiles, setPickedImageFiles] = useState<File[]>([])

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

  const createMemory = async () => {
    if (uploading) return

    setUploading(true)
    const uploadedImageUrls = await Promise.all(
      pickedImageFiles.map(async (file) => {
        return imageUploadService.upload(file)
      }),
    ).finally(() => {
      setUploading(false)
    })

    await memoriesService.createMemory(
      slug,
      data.title,
      data.description,
      data.timestamp,
      uploadedImageUrls,
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

                <div className='duration-150 hover:border-default-400 border-default-200 border-medium focus-within:border-default-foreground focus-within:hover:border-default-foreground mt-4 rounded-lg cursor-pointer'>
                  <label className='flex gap-2 justify-center items-center w-full text-small text-foreground-700 cursor-pointer p-4'>
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
                <Button
                  color='primary'
                  onPress={createMemory}
                  disabled={uploading}
                >
                  {uploading ? 'Uploading images...' : 'Create memory'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
