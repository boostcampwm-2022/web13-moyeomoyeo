import Image from 'next/image';
import LogoIcon from '@public/icons/moyeomoyeo.svg';

const Logo = () => {
  return <Image src={LogoIcon} alt="moyeomoyeo" width={40} height={40} />;
};

export default Logo;
