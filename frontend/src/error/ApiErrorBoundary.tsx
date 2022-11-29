import { Component, PropsWithChildren, useState } from 'react';

import { AxiosError } from 'axios';

import AlertModal from '@components/common/AlertModal';
import AuthError from '@error/AuthError';

interface Props extends PropsWithChildren {}

interface State {
  error: Error;
}

class ApiErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    if (error instanceof AxiosError && !(error instanceof AuthError)) return { error };
    throw error;
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error) {
      return <ApiErrors />;
    }
    return children;
  }
}

export default ApiErrorBoundary;

const ApiErrors = () => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <AlertModal
      open={open}
      onClose={() => setOpen(false)}
      message="요청 도중 오류가 발생했습니다. 다시 시도해주세요."
    />
  );
};
