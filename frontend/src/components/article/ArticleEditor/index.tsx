import dynamic from 'next/dynamic';

import styled from '@emotion/styled';
import { LoadingOverlay, Text } from '@mantine/core';
import { RichTextEditorProps } from '@mantine/rte';

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
