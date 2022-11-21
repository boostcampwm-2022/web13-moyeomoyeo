import { useState } from 'react';
import { IconPlus } from '@tabler/icons';

import { FABWrapper } from './styles';

const FloatingButton = () => {
  const [opened, setOpened] = useState(false);

  return (
    <FABWrapper
      color="indigo"
      variant="filled"
      radius="xl"
      size={48}
      onClick={() => setOpened((o) => !o)}
      opened={opened}
    >
      <IconPlus size={24} />
    </FABWrapper>
  );
};

export default FloatingButton;
