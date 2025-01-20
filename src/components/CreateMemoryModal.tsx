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

interface Props {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export default function CreateMemoryModal({ isOpen, onOpenChange }: Props) {
  const [selectedImages, setSelectedImages] = useState<string[]>([])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const imageUrls = files.map((file) => URL.createObjectURL(file))
    setSelectedImages((oldImageUrls) => [...oldImageUrls, ...imageUrls])
  }

  const handleDeleteImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index))
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
                <Input
                  name='name'
                  label='Name'
                  placeholder='Name your memory'
                  variant='bordered'
                />
                <Textarea
                  name='description'
                  label='Description'
                  placeholder='Enter your memory description'
                  variant='bordered'
                />
                <DatePicker name='date' label='Date' variant='bordered' />

                {selectedImages.length > 0 && (
                  <div className='mt-2'>
                    <label className='text-small text-foreground-700 mb-2 block'>
                      Selected Images
                    </label>
                    <div className='grid grid-cols-4 gap-4'>
                      {selectedImages.map((image, index) => (
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
                <Button color='primary' onPress={onClose}>
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
