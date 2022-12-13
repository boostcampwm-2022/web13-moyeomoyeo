import { ComponentProps, forwardRef } from 'react';

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

const Avatar = forwardRef<HTMLDivElement, Props>(({ size, ...rest }, ref) => {
  return (
    <AvatarWrapper ref={ref}>
      <AvatarImage
        {...rest}
        layout="fixed"
        width={AVATAR_SIZES[size]}
        height={AVATAR_SIZES[size]}
        defaultImgUrl="/avatar.jpg"
      />
    </AvatarWrapper>
  );
});

Avatar.displayName = 'Avatar';

const AvatarWrapper = styled.div`
  font-size: 0;
`;

const AvatarImage = styled(Image)`
  border-radius: 50%;
`;

export default Avatar;
