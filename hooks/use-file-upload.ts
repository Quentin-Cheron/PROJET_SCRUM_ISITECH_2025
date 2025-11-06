import { ChangeEvent, DragEvent, useCallback, useState } from "react";

export interface FileWithPreview {
  id: string
  file: File | { type: string; name: string; size: number; url?: string }
}

export interface UseFileUploadOptions {
  multiple?: boolean
  maxFiles?: number
  maxSize?: number
  accept?: string
  initialFiles?: Array<{
    name: string
    size: number
    type: string
    url?: string
    id: string
  }>
}

export interface UseFileUploadReturn {
  files: FileWithPreview[]
  isDragging: boolean
  errors: string[]
  handleDragEnter: (e: DragEvent<HTMLDivElement>) => void
  handleDragLeave: (e: DragEvent<HTMLDivElement>) => void
  handleDragOver: (e: DragEvent<HTMLDivElement>) => void
  handleDrop: (e: DragEvent<HTMLDivElement>) => void
  openFileDialog: () => void
  removeFile: (id: string) => void
  clearFiles: () => void
  getInputProps: () => {
    type: string
    multiple?: boolean
    accept?: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
  }
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

export function useFileUpload(
  options: UseFileUploadOptions = {}
): [
  {
    files: FileWithPreview[]
    isDragging: boolean
    errors: string[]
  },
  {
    handleDragEnter: (e: DragEvent<HTMLDivElement>) => void
    handleDragLeave: (e: DragEvent<HTMLDivElement>) => void
    handleDragOver: (e: DragEvent<HTMLDivElement>) => void
    handleDrop: (e: DragEvent<HTMLDivElement>) => void
    openFileDialog: () => void
    removeFile: (id: string) => void
    clearFiles: () => void
    getInputProps: () => {
      type: string
      multiple?: boolean
      accept?: string
      onChange: (e: ChangeEvent<HTMLInputElement>) => void
    }
  }
] {
  const {
    multiple = false,
    maxFiles = 1,
    maxSize = 5 * 1024 * 1024, // 5MB default
    accept,
    initialFiles = [],
  } = options

  const [files, setFiles] = useState<FileWithPreview[]>(() =>
    initialFiles.map((f) => ({
      id: f.id || `${f.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file: f,
    }))
  )
  const [isDragging, setIsDragging] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const validateAndAddFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const fileArray = Array.from(newFiles)
      const currentErrors: string[] = []

      if (!multiple && fileArray.length > 1) {
        currentErrors.push("Only one file is allowed")
        setErrors(currentErrors)
        return
      }

      if (files.length + fileArray.length > maxFiles) {
        currentErrors.push(`Maximum ${maxFiles} files allowed`)
        setErrors(currentErrors)
        return
      }

      const validFiles: FileWithPreview[] = []

      for (const file of fileArray) {
        if (file.size > maxSize) {
          currentErrors.push(
            `${file.name} is too large. Maximum size is ${formatBytes(maxSize)}`
          )
          continue
        }

        validFiles.push({
          id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          file,
        })
      }

      if (validFiles.length > 0) {
        setFiles((prev) => [...prev, ...validFiles])
        setErrors([])
      } else if (currentErrors.length > 0) {
        setErrors(currentErrors)
      }
    },
    [files.length, maxFiles, maxSize, multiple]
  )

  const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const droppedFiles = e.dataTransfer.files
      if (droppedFiles.length > 0) {
        validateAndAddFiles(droppedFiles)
      }
    },
    [validateAndAddFiles]
  )

  const handleFileInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files
      if (selectedFiles && selectedFiles.length > 0) {
        validateAndAddFiles(selectedFiles)
      }
      // Reset input value to allow selecting the same file again
      e.target.value = ""
    },
    [validateAndAddFiles]
  )

  const openFileDialog = useCallback(() => {
    const input = document.createElement("input")
    input.type = "file"
    input.multiple = multiple
    if (accept) input.accept = accept
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files
      if (files) {
        validateAndAddFiles(files)
      }
    }
    input.click()
  }, [multiple, accept, validateAndAddFiles])

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
    setErrors([])
  }, [])

  const clearFiles = useCallback(() => {
    setFiles([])
    setErrors([])
  }, [])

  const getInputProps = useCallback(() => {
    return {
      type: "file" as const,
      multiple,
      accept,
      onChange: handleFileInputChange,
    }
  }, [multiple, accept, handleFileInputChange])

  return [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ]
}
