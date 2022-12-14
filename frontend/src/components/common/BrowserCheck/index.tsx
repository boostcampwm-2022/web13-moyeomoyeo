import { useEffect, useState } from 'react';

import { isChrome, isChromium } from 'react-device-detect';

import AlertModal from '@components/common/AlertModal';

const BrowserCheck = () => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const browserChecked = sessionStorage.getItem('browser-checked');
    if (browserChecked) return;
    if (!(isChrome || isChromium)) {
      setModalOpen(true);
    }
    sessionStorage.setItem('browser-checked', 'true');
  }, []);

  return (
    <>
      <AlertModal
        message="크롬 계열이 아닌 다른 브라우저로 확인됩니다. 해당 서비스는 크롬 브라우저에 최적화 되었습니다."
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default BrowserCheck;
