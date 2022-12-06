// eslint-disable-next-line import/no-named-default
import { ImageProps, default as NextImage } from 'next/image';
import { useState } from 'react';

interface Props extends ImageProps {
  defaultImgUrl?: string;
}

const defaultImgPath = '/default.jpg';

const Image = ({ src, defaultImgUrl = defaultImgPath, ...rest }: Props) => {
  const [imgSrc, setImgSrc] = useState(src);
  return <NextImage src={imgSrc} {...rest} onError={() => setImgSrc(defaultImgPath)} />;
};

export default Image;
