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
      {header}
      <ContentWrapper>
        {children}
        {hasFloatingUtil && <FloatingUtilButton authorized />}
      </ContentWrapper>
      {footer}
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

export default PageLayout;
