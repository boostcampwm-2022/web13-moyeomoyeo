import Footer from '@components/Footer';
import { ContentWrapper, PageWrapper } from '@pages/style';

export default function Main() {
  return (
    <PageWrapper>
      <div>header</div>
      <ContentWrapper>main page</ContentWrapper>
      <Footer />
    </PageWrapper>
  );
}
