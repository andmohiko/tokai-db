import { useState, useCallback, ChangeEvent } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '@/lib/firebase'

export const useFileInput = (
  path: string,
  defaultValue = ''
): [string, (e: ChangeEvent<HTMLInputElement>) => Promise<string>] => {
  const [fileURL, setFileURL] = useState(defaultValue)

  const onChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>): Promise<string> => {
      const files = e.target.files
      if (!files || files.length === 0) {
        return ''
      }

      const file = files[0]
      try {
        const fileURL = await uploadImage(path, file)
        setFileURL(fileURL)
        return fileURL
      } catch {
        console.log('error upload file')
      }
      return ''
    },
    [setFileURL]
  )

  return [fileURL, onChange]
}

const uploadImage = async (path: string, blob: Blob): Promise<string> => {
  const imageRef = ref(storage, path)
  const snapShot = await uploadBytesResumable(imageRef, blob)
  return getDownloadURL(snapShot.ref)
}
