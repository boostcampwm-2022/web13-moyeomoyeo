import dynamic from 'next/dynamic';
import { useCallback } from 'react';

import styled from '@emotion/styled';
import { LoadingOverlay, Text } from '@mantine/core';
import { RichTextEditorProps } from '@mantine/rte';

import uploadImage from '@utils/uploadImage';

const RichTextEditor = dynamic(() => import('@mantine/rte'), {
  ssr: false,
  loading: () => (
    <LoadingWrapper>
      <LoadingOverlay visible overlayBlur={2} />,
    </LoadingWrapper>
  ),
});

interface Props extends RichTextEditorProps {}

const ArticleEditor = (props: Props) => {
  const handleEditorImageUpload = useCallback(
    async (file: File) => {
      try {
        return (await uploadImage(file)).url;
      } catch (err) {
        throw new Error('에디터 이미지 업로드 실패');
      }
    },
    // 빈 칸으로 두지 않으면 에디터가 정상적으로 작동 안함!
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <ArticleEditorWrapper>
      <ArticleEditorLabel>
        <Text size="md" fw={500}>
          내용
        </Text>
        <Text c="red" size="md">
          *
        </Text>
      </ArticleEditorLabel>
      <StyledEditor
        id="rte"
        controls={[
          ['bold', 'italic', 'underline', 'strike'],
          ['h1', 'h2', 'h3'],
          ['alignLeft', 'alignCenter', 'alignRight'],
          ['unorderedList', 'orderedList'],
          ['blockquote', 'code', 'link', 'image'],
        ]}
        onImageUpload={handleEditorImageUpload}
        {...props}
      />
    </ArticleEditorWrapper>
  );
};

const ArticleEditorWrapper = styled.div``;

const ArticleEditorLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.4rem;
`;

const StyledEditor = styled(RichTextEditor)`
  & .quill,
  & .ql-container {
    min-height: 40rem;
    max-height: 40rem;
    overflow: auto;
    font-size: 1.4rem;
  }
`;

const LoadingWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 447px;
  border: 1px solid ${({ theme }) => theme.colors.gray[4]};
  border-radius: '0.8rem';
`;

export default ArticleEditor;
