import useFetchMyData from '@hooks/queries/useFetchMyData';

// TODO 테스트를 위해 작성, 추후 제거
const Test = () => {
  const { data: myData } = useFetchMyData();

  return <div>{myData ? myData.userName : ''}</div>;
};

export default Test;
