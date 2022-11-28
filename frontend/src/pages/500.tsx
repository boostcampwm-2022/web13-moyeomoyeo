import ErrorMessage from '@components/common/ErrorMessage';
import { ERROR_MESSAGE } from '@constants/error';

const Custom500 = () => {
  const { title, description, subDescription } = ERROR_MESSAGE['500'];

  return (
    <ErrorMessage
      errorCode={500}
      title={title}
      description={description}
      subDescription={subDescription}
    />
  );
};

export default Custom500;
