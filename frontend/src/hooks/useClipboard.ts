import { useState } from 'react';

const useClipboard = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const doCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
      })
      .catch(() => {});
  };

  return { isCopied, setIsCopied, doCopy };
};

export default useClipboard;
