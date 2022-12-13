import Link from 'next/link';

import { Button } from '@mantine/core';

const LoginButton = () => {
  return (
    <Link href="/login">
      <Button variant="subtle" color="indigo" size="md" compact>
        로그인
      </Button>
    </Link>
  );
};

export default LoginButton;
