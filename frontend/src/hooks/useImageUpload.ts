import { ImageUploadType } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

const useImageUpload = () => {
  const handleUploadImage = async (file: File) => {
    try {
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
    } catch (err) {
      // TODO 에러처리 어떤식으로 해야할까...
      throw new Error('이미지 업로드 에러 발생');
    }
  };

  return { handleUploadImage };
};

export default useImageUpload;
