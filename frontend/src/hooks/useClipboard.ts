import { useState } from 'react';

const useClipboard = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const doCopy = (text: string) => {
    void navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
    });
  };

  return { isCopied, setIsCopied, doCopy };
};

export default useClipboard;
