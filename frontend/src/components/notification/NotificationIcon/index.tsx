import { ActionIcon } from '@mantine/core';
import { IconCheck, IconMessageCircle2, IconX } from '@tabler/icons';

import { Notification } from '@constants/notification';
import { NotificationType } from '@typings/types';

interface Props {
  variant: NotificationType['type'];
}

const NotificationIcon = ({ variant }: Props) => {
  const iconScheme =
    variant === Notification.COMMENT_ADDED
      ? { color: 'indigo', icon: <IconMessageCircle2 size={20} /> }
      : variant === Notification.GROUP_SUCCEED
      ? {
          color: 'cyan',
          icon: <IconCheck size={20} />,
        }
      : {
          color: 'red',
          icon: <IconX size={20} />,
        };
  return (
    <ActionIcon variant="light" radius="sm" color={iconScheme.color}>
      {iconScheme.icon}
    </ActionIcon>
  );
};

export default NotificationIcon;
