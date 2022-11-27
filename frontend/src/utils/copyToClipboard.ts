const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      // TODO toast or modal open
      alert('클립보드에 복사되었습니다.');
    })
    .catch(() => {
      alert('복사를 다시 시도해주세요.');
    });
};

export default copyToClipboard;
