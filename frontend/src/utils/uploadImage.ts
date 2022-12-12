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
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const heic2any = require('heic2any');
  const jpegBlob = await heic2any({ blob: file, toType: 'image/jpeg' });
  const jpegFile = new File([jpegBlob as Blob], file.name.split('.')[0] + '.jpeg', {
    lastModified: new Date().getTime(),
    type: 'image/jpeg',
  });
  return jpegFile;
};

const uploadImage = async (file: File) => {
  const formData = new FormData();
  if ((file && file.type === 'image/heic') || file.type === 'image/heif') {
    file = await convertToJpeg(file);
  }

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
