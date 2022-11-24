import dynamic from 'next/dynamic';
import { Text } from '@mantine/core';

import styled from '@emotion/styled';

const RichTextEditor = dynamic(() => import('@mantine/rte'), {
  ssr: false,
  loading: () => null,
});

const ArticleEditor = () => {
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

export default ArticleEditor;
