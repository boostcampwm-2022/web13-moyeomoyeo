import Footer from '@components/Footer';
import styled from '@emotion/styled';

export default function Main() {
  return (
    <PageWrapper>
      <div>header</div>
      <ContentWrapper>main page</ContentWrapper>
      <Footer />
    </PageWrapper>
  );
}

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
