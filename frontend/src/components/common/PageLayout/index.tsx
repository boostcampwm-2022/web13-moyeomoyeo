import { ReactNode, PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import FloatingUtilButton from '@components/common/FloatingUtilButton';

import Footer from '@components/common/Footer';

interface Props extends PropsWithChildren {
  header?: ReactNode;
  hasFooter?: boolean;
  hasFloatingUtil?: boolean;
}

const PageLayout = ({ header, hasFooter, hasFloatingUtil, children }: Props) => {
  return (
    <PageWrapper>
      {header}
      <ContentWrapper>
        {children}
        {hasFloatingUtil && <FloatingUtilButton authorized />}
      </ContentWrapper>
      {hasFooter && <Footer />}
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
  flex: 1;
`;

export default PageLayout;
