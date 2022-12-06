import { ComponentProps } from 'react';

import styled from '@emotion/styled';

import Image from '@components/common/Image';

const AVATAR_SIZES = {
  sm: 26,
  md: 38,
  lg: 56,
  xl: 84,
};

interface Props extends ComponentProps<typeof Image> {
  size: keyof typeof AVATAR_SIZES;
}

const Avatar = ({ size, ...rest }: Props) => {
  return (
    <AvatarImage
      {...rest}
      layout="fixed"
      width={AVATAR_SIZES[size]}
      height={AVATAR_SIZES[size]}
      defaultImgUrl="/avatar.jpg"
    />
  );
};

const AvatarImage = styled(Image)`
  border-radius: 50%;
`;

export default Avatar;
