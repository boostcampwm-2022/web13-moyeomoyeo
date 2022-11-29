import { Component, PropsWithChildren, useState } from 'react';

import RedirectHomeModal from '@components/common/RedirectHomeModal';

import AuthError from './AuthError';

interface Props extends PropsWithChildren {}

interface State {
  error: Error;
}

class AuthErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    if (error instanceof AuthError) return { error };
    throw error;
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error) {
      return <AuthErrors />;
    }
    return children;
  }
}

export default AuthErrorBoundary;

const AuthErrors = () => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <RedirectHomeModal
      open={open}
      onClose={() => setOpen(false)}
      message="로그인이 필요한 서비스입니다."
    />
  );
};
