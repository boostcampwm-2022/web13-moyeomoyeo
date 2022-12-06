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

const uploadImage = async (file: File) => {
  const formData = new FormData();
  const compressedImage = await compressImage(file);
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
