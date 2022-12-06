import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';

interface ToastProps {
  title: string;
  message: string;
}

const showToast = ({ title, message }: ToastProps) =>
  showNotification({
    title,
    message,
    color: 'indigo',
    icon: <IconCheck size={16} />,
    autoClose: 4000,
    styles: (theme) => ({
      root: {
        paddingTop: '1.6rem',
        paddingBottom: '1.6rem',
      },
      title: {
        fontSize: theme.fontSizes.lg,
        fontWeight: 700,
      },
    }),
  });

export { showToast };
