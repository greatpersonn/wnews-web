import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/shared/config/firebase';
import { sanitizeFileName } from '@/shared/lib/file';

interface UploadFileOptions {
  folder: string;
  file: File;
  fileName?: string;
}

export async function uploadFileAndGetUrl({
  folder,
  file,
  fileName,
}: UploadFileOptions): Promise<string> {
  const timestamp = Date.now();
  const safeName = sanitizeFileName(fileName ?? file.name);
  const fullPath = `${folder}/${timestamp}-${safeName}`;

  const storageRef = ref(storage, fullPath);

  await uploadBytes(storageRef, file, {
    contentType: file.type || undefined,
  });

  return getDownloadURL(storageRef);
}