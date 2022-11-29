import { Component, PropsWithChildren } from 'react';

import ErrorMessage from '@components/common/ErrorMessage';

interface Props extends PropsWithChildren {}

interface State {
  error: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error) {
      return <ErrorFallback />;
    }
    return children;
  }
}

export default ErrorBoundary;

const ErrorFallback = () => {
  return (
    <ErrorMessage
      title={'예기치 못한 오류가 발생했습니다.'}
      description={'죄송합니다. 빠른 시일 내에 해결해드리겠습니다.'}
    />
  );
};
