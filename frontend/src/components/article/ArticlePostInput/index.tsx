import styled from '@emotion/styled';
import { FileInput, Text } from '@mantine/core';
import { IconUpload } from '@tabler/icons';

import ArticleEditor from '@components/article/ArticleEditor';
import ImageThumbnail from '@components/article/ImageThumbnail';
import TextInput from '@components/common/TextInput';
import useAsyncError from '@hooks/useAsyncError';
import { ArticlePostInputType } from '@typings/types';
import uploadImage from '@utils/uploadImage';

interface Props {
  values: ArticlePostInputType;
  onChange: (target: keyof ArticlePostInputType, value: string) => void;
}

const ArticlePostInput = ({ values, onChange }: Props) => {
  const { title, contents, chatUrl, thumbnail } = values;
  const throwAsyncError = useAsyncError();

  const handleChangeImage = async (imageFile: File) => {
    try {
      const uploadedImage = await uploadImage(imageFile);
      onChange('thumbnail', uploadedImage.url);
    } catch (err) {
      throwAsyncError('이미지 업로드에 실패했습니다.');
    }
  };

  return (
    <PostSection>
      <TextInput
        label="제목"
        placeholder="제목을 입력해주세요."
        required
        value={title}
        onChange={(e) => onChange('title', e.target.value)}
      />
      <ArticleEditor value={contents} onChange={(contents) => onChange('contents', contents)} />
      <TextInput
        label="채팅방 링크"
        placeholder="채팅방 링크를 입력해주세요."
        required
        value={chatUrl}
        onChange={(e) => onChange('chatUrl', e.target.value)}
      />
      <ImageSection>
        <FileInputLabel>
          <Text size="md" fw={500}>
            썸네일 이미지
          </Text>
          <Text c="red" size="md">
            *
          </Text>
        </FileInputLabel>
        <ImageThumbnail src={thumbnail} />
        <FileInput
          size="md"
          required
          placeholder="이미지를 첨부해주세요 (최대 1장)"
          accept="image/*"
          onChange={handleChangeImage}
          icon={<IconUpload size={16} />}
        />
      </ImageSection>
    </PostSection>
  );
};

export default ArticlePostInput;

const PostSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.6rem;
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FileInputLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;
