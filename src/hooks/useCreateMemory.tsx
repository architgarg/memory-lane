import { useMutation, useQueryClient } from 'react-query'
import { imageUploadService } from '../services/file.service.ts'
import { memoriesService } from '../services/memory.service.ts'

export const useCreateMemory = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async ({
      slug,
      title,
      description,
      timestamp,
      pickedImageFiles,
    }: {
      slug: string
      title: string
      description: string
      timestamp: string
      pickedImageFiles: File[]
    }) => {
      const uploadedImageUrls = await Promise.all(
        pickedImageFiles.map(async (file) => {
          return imageUploadService.upload(file)
        }),
      )

      await memoriesService.createMemory(
        slug,
        title,
        description,
        timestamp,
        uploadedImageUrls,
      )
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['memories', variables.slug])
      },
    },
  )
}
