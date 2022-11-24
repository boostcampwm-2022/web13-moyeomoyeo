import { ReactNode, PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import FloatingUtilButton from '@components/common/FloatingUtilButton';

interface Props extends PropsWithChildren {
  header?: ReactNode;
  footer?: ReactNode;
  hasFloatingUtil?: boolean;
}

const PageLayout = ({ header, footer, hasFloatingUtil, children }: Props) => {
  return (
    <PageWrapper>
      <HeaderWrapper>{header}</HeaderWrapper>
      <ContentWrapper>
        {children}
        {hasFloatingUtil && <FloatingUtilButton authorized />}
      </ContentWrapper>
      <FooterWrapper>{footer}</FooterWrapper>
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
  padding: 1.6rem;
  flex: 1;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
`;

const FooterWrapper = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  z-index: 100;
`;

export default PageLayout;
