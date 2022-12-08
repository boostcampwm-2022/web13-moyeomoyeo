// eslint-disable-next-line import/no-named-default
import { ImageProps, default as NextImage } from 'next/image';
import { useEffect, useState } from 'react';

interface Props extends ImageProps {
  defaultImgUrl?: string;
  className?: string;
}

const defaultImgPath = '/default.jpg';

const Image = ({ src, defaultImgUrl = defaultImgPath, ...rest }: Props) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);
  return <NextImage src={imgSrc} {...rest} onError={() => setImgSrc(defaultImgPath)} />;
};

export default Image;
