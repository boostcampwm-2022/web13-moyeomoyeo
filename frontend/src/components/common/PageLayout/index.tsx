import { ReactNode, PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import FloatingUtilButton from '@components/common/FloatingUtilButton';

import Footer from '@components/common/Footer';

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
        {floatingUtil && <FloatingUtilButton authorized />}
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
