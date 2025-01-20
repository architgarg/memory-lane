import Card from './shared/Card.tsx'
import H1 from './shared/H1.tsx'
import AppLogo from './shared/AppLogo.tsx'
import Container from './shared/Container.tsx'
import {
  EllipsisVerticalIcon,
  PlusIcon,
  ShareIcon,
} from '@heroicons/react/20/solid'
import IconButton from './shared/IconButton.tsx'
import { Select, SelectItem } from '@heroui/select'
import { Button } from '@heroui/button'
import MemoryTile from './MemoryTile.tsx'
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { memoriesService } from '../services/memory.service.ts'
import { Memory, MemoryLane } from '@prisma/client'
import toast from 'react-hot-toast'
import { copyToClipboard } from '../utils.ts'
import { useDisclosure } from '@heroui/react'
import CreateMemoryModal from './CreateMemoryModal.tsx'

interface Props {
  slug: string
}

function MemoryPage({ slug }: Props) {
  const [memories, setMemories] = useState<Memory[]>([])
  const [memoryLane, setMemoryLane] = useState<MemoryLane>()
  const [memoriesSortOrder, setMemoriesSortOrder] = useState<'desc' | 'asc'>(
    'desc',
  )
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const fetchMemories = useCallback(async () => {
    if (!slug) return

    const { memories, memoryLane } =
      await memoriesService.getByMemoryLaneSlug(slug)

    setMemoryLane(memoryLane)
    setMemories(memories)
  }, [slug])

  useEffect(() => {
    fetchMemories()
  }, [fetchMemories])

  const copyShareLink = () => {
    copyToClipboard(window.location.href)
      .then(() => {
        toast.success('Link copied to clipboard')
      })
      .catch(() => {
        console.warn('Failed to copy')
      })
  }

  const sortedMemories = useMemo(() => {
    return memories.sort(
      (a, b) =>
        (memoriesSortOrder === 'asc' ? 1 : -1) *
        (new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
    )
  }, [memories, memoriesSortOrder])

  const onMemoryCreated = () => {
    fetchMemories()
    onOpenChange()
  }

  return (
    <Container className='mt-20 space-y-16 mb-40'>
      <CreateMemoryModal
        slug={slug}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSuccess={onMemoryCreated}
      />
      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          <AppLogo />
          <H1>{memoryLane?.user_name}'s Memory lane</H1>
        </div>

        <IconButton icon={ShareIcon} onClick={copyShareLink} />
      </div>

      <Card>{memoryLane?.description}</Card>

      <div className='flex items-center justify-between'>
        <Select
          className='max-w-[200px]'
          variant='bordered'
          onChange={(e) =>
            setMemoriesSortOrder(e.target.value as unknown as 'desc' | 'asc')
          }
          aria-label='Sort memories'
          defaultSelectedKeys={[memoriesSortOrder]}
        >
          <SelectItem key='asc'>Older to new</SelectItem>
          <SelectItem key='desc'>New to older</SelectItem>
        </Select>

        <Button
          variant='bordered'
          startContent={<PlusIcon className='h-6 w-6' />}
          onPress={onOpen}
        >
          New memory
        </Button>
      </div>

      <div className='max-w-lg m-auto space-y-4'>
        {sortedMemories.map((memory, index) => (
          <Fragment key={memory.id}>
            <MemoryTile memory={memory} />
            {index < memories.length - 1 && (
              <div className='flex justify-center items-center'>
                <EllipsisVerticalIcon className='h-6 w-6 text-gray-500' />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </Container>
  )
}

export default MemoryPage
