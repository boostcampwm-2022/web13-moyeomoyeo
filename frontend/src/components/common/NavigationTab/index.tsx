import Link from 'next/link';
import { useRouter } from 'next/router';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { IconBell, IconHome2, IconUser } from '@tabler/icons';

const NavigationTab = () => {
  const {
    colors: { indigo, gray },
  } = useTheme();
  const { pathname } = useRouter();

  return (
    <NavigationTabWrapper>
      <Link href="/">
        <TabDiv>
          <IconHome2 color={pathname === '/' ? indigo[7] : gray[2]} />
        </TabDiv>
      </Link>
      <Link href="/notification">
        <TabDiv>
          <IconBell color={pathname === '/notification' ? indigo[7] : gray[2]} />
        </TabDiv>
      </Link>
      <Link href="/my">
        <TabDiv>
          <IconUser color={pathname === '/my' ? indigo[7] : gray[2]} />
        </TabDiv>
      </Link>
    </NavigationTabWrapper>
  );
};

const NavigationTabWrapper = styled.footer`
  display: flex;
  position: sticky;
  bottom: 0;
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

export default NavigationTab;
