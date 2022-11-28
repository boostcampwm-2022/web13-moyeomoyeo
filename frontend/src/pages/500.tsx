import ErrorMessage from '@components/common/ErrorMessage';

const Custom500 = () => {
  return (
    <ErrorMessage
      errorCode={500}
      title="에러가 발생했어요"
      description="저희가 뭘 잘못 만들었나봐요."
      subDescription="금방 해결해드릴게요."
    />
  );
};

export default Custom500;
