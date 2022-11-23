import { Menu, Text } from '@mantine/core';
import { ReactNode, PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { IconArrowAutofitUp, IconPencil } from '@tabler/icons';

import Footer from '@components/common/Footer';
import FloatingButton from '@components/common/FloatingButton';

interface Props extends PropsWithChildren {
  header?: ReactNode;
  footer?: boolean;
  floatingUtil?: boolean;
}

const PageLayout = ({ header, footer, floatingUtil, children }: Props) => {
  return (
    <PageWrapper>
      {header}
      <ContentWrapper>
        {children}
        {floatingUtil && (
          <FloatingButton>
            <Menu.Item
              p="md"
              icon={<IconArrowAutofitUp color="black" size={20} />}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Text fz="md" fw={500}>
                상단으로 이동
              </Text>
            </Menu.Item>
            <Menu.Item p="md" icon={<IconPencil color="black" size={20} />}>
              <Text fz="md" fw={500}>
                게시글 작성
              </Text>
            </Menu.Item>
          </FloatingButton>
        )}
      </ContentWrapper>
      {footer && <Footer />}
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 6.4rem - 5.6rem);
`;

export default PageLayout;
