import ErrorMessage from '@components/common/ErrorMessage';

const Custom404 = () => {
  return (
    <ErrorMessage
      errorCode={404}
      title="저희의 빈틈을 찾으셨군요"
      description="여기는 그저 빈 페이지 입니다."
      subDescription="홈 페이지로 돌려 보내드릴게요."
    />
  );
};

export default Custom404;
