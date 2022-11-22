import Footer from '@components/Footer';
import { ReactNode, PropsWithChildren } from 'react';
import styled from '@emotion/styled';

interface Props extends PropsWithChildren {
  header?: ReactNode;
  footer?: boolean;
}

const PageLayout = ({ header, footer, children }: Props) => {
  return (
    <PageWrapper>
      {header}
      <ContentWrapper>{children}</ContentWrapper>
      {footer && <Footer />}
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 6.4rem - 5.6rem);
`;

export default PageLayout;
