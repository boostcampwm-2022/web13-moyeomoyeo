import Footer from '@components/Footer';
import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

interface Props extends PropsWithChildren {}

const PageLayout = ({ children }: Props) => {
  return (
    <PageWrapper>
      <div>header</div>
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  gap: 0.5rem;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export default PageLayout;
