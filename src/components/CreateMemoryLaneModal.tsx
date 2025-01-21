import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@heroui/react'
import React from 'react'
import CreateMemoryLaneForm from './CreateMemoryLaneForm.tsx'

export default function CreateMemoryModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <div className='fixed bottom-10 right-10 z-10 flex'>
        <Button
          variant='flat'
          size='sm'
          className='bg-white shadow-lg'
          onPress={() => {
            // setData({
            //   name: '',
            //   slug: '',
            //   description: '',
            // })
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
                <CreateMemoryLaneForm onSuccess={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
