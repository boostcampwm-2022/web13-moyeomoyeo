import { Component, PropsWithChildren, useState } from 'react';

import { AxiosError } from 'axios';

import AlertModal from '@components/common/AlertModal';
import AuthError from '@components/common/ErrorBoundary/AuthError';
import GetError from '@components/common/ErrorBoundary/GetError';
import RequestError from '@components/common/ErrorBoundary/RequestError';

interface Props extends PropsWithChildren {}

interface State {
  error: AxiosError;
}

class ApiErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    if (error instanceof AxiosError && !(error instanceof AuthError)) {
      return { error };
    }
    throw error;
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (!error) return children;

    if (error instanceof GetError) {
      return <ApiErrorModal message={error.message} />;
    }
    if (error instanceof RequestError) {
      return (
        <>
          {children}
          <ApiErrorModal message={error.message} />
        </>
      );
    }
  }
}

export default ApiErrorBoundary;

const ApiErrorModal = ({ message }: { message: string }) => {
  const [open, setOpen] = useState<boolean>(true);
  return <AlertModal open={open} onClose={() => setOpen(false)} message={message} />;
};
