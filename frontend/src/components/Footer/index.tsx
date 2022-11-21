import styled from '@emotion/styled';
import { IconBell, IconHome2, IconUser } from '@tabler/icons';
import { useTheme } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Footer = () => {
  const {
    colors: { indigo, gray },
  } = useTheme();
  const { pathname } = useRouter();

  return (
    <FooterWrapper>
      <Link href={'/'}>
        <TabDiv>
          <IconHome2 color={pathname === '/' ? indigo[7] : gray[2]} />
        </TabDiv>
      </Link>
      <Link href={'/Notification'}>
        <TabDiv>
          <IconBell color={pathname === '/Notification' ? indigo[7] : gray[2]} />
        </TabDiv>
      </Link>
      <Link href={'/My'}>
        <TabDiv>
          <IconUser color={pathname === '/My' ? indigo[7] : gray[2]} />
        </TabDiv>
      </Link>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 5.6rem;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.1);
`;

const TabDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;

export default Footer;
