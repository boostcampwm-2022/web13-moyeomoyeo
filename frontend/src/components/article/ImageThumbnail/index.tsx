import styled from '@emotion/styled';
import Image from 'next/image';
import { useTheme } from '@emotion/react';
import { IconPhoto } from '@tabler/icons';

interface Props {
  /**
   * 썸네일로 사용할 이미지의 URL을 입력합니다.
   * 예시) https://images.unsplash.com/photo-1669267234783-ab82d945fe5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1007&q=80
   */
  src?: string | null;
}

const ImageThumbnail = ({ src = null }: Props) => {
  const {
    colors: { gray },
  } = useTheme();

  return (
    <ThumbnailWrapper>
      {src ? (
        <ThumbnailImage src={src} alt={'thumbnail-image'} width={120} height={120} />
      ) : (
        <IconPhoto size={24} color={gray[6]} />
      )}
    </ThumbnailWrapper>
  );
};

export default ImageThumbnail;

const ThumbnailImage = styled(Image)`
  border-radius: 0.8rem;
`;

const ThumbnailWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[0]};
  width: 12rem;
  height: 12rem;
  border-radius: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
