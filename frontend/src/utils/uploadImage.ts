import imageCompression from 'browser-image-compression';

import { ImageUploadType } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

const compressImage = async (file: File) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  const compressedBlob = await imageCompression(file, options);
  return new File([compressedBlob], file.name);
};

const convertToJpeg = async (file: File) => {
  const heic2any = (await import('heic2any')).default;
  const jpegBlob = await heic2any({ blob: file, toType: 'image/jpeg' });
  const jpegFile = new File([jpegBlob as Blob], file.name.split('.')[0] + '.jpeg', {
    lastModified: new Date().getTime(),
    type: 'image/jpeg',
  });
  return jpegFile;
};

const uploadImage = async (file: File) => {
  let uploadedFile = file;
  if (uploadedFile.type === 'image/heic' || uploadedFile.type === 'image/heif') {
    uploadedFile = await convertToJpeg(uploadedFile);
  }

  const compressedImage = await compressImage(uploadedFile);

  const formData = new FormData();
  formData.append('files', compressedImage);

  const {
    data: {
      data: { 0: imageData },
    },
  } = await clientAxios.post('/v1/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return imageData as ImageUploadType;
};

export default uploadImage;
