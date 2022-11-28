import ErrorMessage from '@components/common/ErrorMessage';
import { ERROR_MESSAGE } from '@constants/error';

const Custom404 = () => {
  const { title, description, subDescription } = ERROR_MESSAGE['404'];

  return (
    <ErrorMessage
      errorCode={404}
      title={title}
      description={description}
      subDescription={subDescription}
    />
  );
};

export default Custom404;
