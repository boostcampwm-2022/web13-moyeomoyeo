import styled from '@emotion/styled';
import Footer from '@components/Footer';

const My = () => {
  return (
    <PageWrapper>
      <div>header</div>
      <ContentWrapper>my page</ContentWrapper>
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
  height: 100%;
`;

export default My;
