import { ImageUploadType } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('files', file);
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
