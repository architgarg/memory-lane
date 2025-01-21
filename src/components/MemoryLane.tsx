import React, { Fragment, useState } from 'react'
import AppLogo from './shared/AppLogo.tsx'
import Container from './shared/Container.tsx'
import {
  EllipsisVerticalIcon,
  PlusIcon,
  ShareIcon,
} from '@heroicons/react/20/solid'
import { Select, SelectItem } from '@heroui/select'
import { Button } from '@heroui/button'
import MemoryTile from './MemoryTile.tsx'
import toast from 'react-hot-toast'
import { copyToClipboard } from '../utils.ts'
import { Modal, ModalBody, ModalContent, useDisclosure } from '@heroui/react'
import CreateMemoryModal from './CreateMemoryModal.tsx'
import { useMemories } from '../hooks/useMemories.tsx'
import MemoryDetails from './MemoryDetails.tsx'
import CreateMemoryLaneModal from './CreateMemoryLaneModal.tsx'
import { MemorySchema } from '../schemas/memory.schema.ts'

interface Props {
  slug: string
}

function MemoryLane({ slug }: Props) {
  const { memories, memoryLane, memoriesSortOrder, setMemoriesSortOrder } =
    useMemories(slug)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [currentMemory, setCurrentMemory] = useState<MemorySchema | null>(null)

  const copyShareLink = () => {
    copyToClipboard(window.location.href)
      .then(() => toast.success('Link copied to clipboard'))
      .catch(() => console.warn('Failed to copy'))
  }

  if (!memoryLane) return null

  return (
    <Container className='pt-20 space-y-10 pb-40'>
      <CreateMemoryModal
        slug={slug}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />

      <Modal
        isOpen={Boolean(currentMemory)}
        size='full'
        onClose={() => {
          setCurrentMemory(null)
        }}
        scrollBehavior='outside'
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody className='!p-0'>
              <MemoryDetails
                onBack={onClose}
                memoryLane={memoryLane}
                memory={currentMemory}
              />
            </ModalBody>
          )}
        </ModalContent>
      </Modal>

      <div className='flex justify-between items-center'>
        <div className='flex items-center space-x-4'>
          <AppLogo />
          <h1 className='font-display text-3xl md:text-5xl'>
            {memoryLane?.user_name}'s Memory lane
          </h1>
        </div>

        <Button
          isIconOnly
          size='md'
          className='bg-white shadow'
          onPress={copyShareLink}
        >
          <ShareIcon className='w-5 h-5 text-primary' />
        </Button>
      </div>

      <div className='shadow bg-white rounded-lg py-4 px-8'>
        {memoryLane?.description}
      </div>

      <div className='flex items-center justify-between gap-2'>
        <Select
          className='max-w-[200px]'
          variant='bordered'
          onChange={(e) =>
            setMemoriesSortOrder(e.target.value as 'desc' | 'asc')
          }
          aria-label='Sort memories'
          defaultSelectedKeys={[memoriesSortOrder]}
          classNames={{
            trigger: 'bg-white',
          }}
        >
          <SelectItem key='asc'>Older to new</SelectItem>
          <SelectItem key='desc'>New to older</SelectItem>
        </Select>

        <Button
          variant='bordered'
          startContent={<PlusIcon className='h-6 w-6' />}
          onPress={onOpen}
          className='bg-white'
        >
          New memory
        </Button>
      </div>

      <div className='max-w-lg m-auto space-y-4'>
        {memories.map((memory, index) => (
          <Fragment key={memory.id}>
            <div
              onClick={() => {
                setCurrentMemory(memory)
              }}
            >
              <MemoryTile memory={memory} />
            </div>
            {index < memories.length - 1 && (
              <div className='flex justify-center items-center'>
                <EllipsisVerticalIcon className='h-6 w-6 text-gray-500' />
              </div>
            )}
          </Fragment>
        ))}
      </div>

      <CreateMemoryLaneModal />
    </Container>
  )
}

export default MemoryLane
