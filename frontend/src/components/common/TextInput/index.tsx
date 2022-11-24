import { TextInput as MantineTextInput, TextInputProps } from '@mantine/core';

interface Props extends TextInputProps {}

const TextInput = (props: Props) => {
  return <MantineTextInput size="md" styles={{ label: { paddingBottom: '0.4rem' } }} {...props} />;
};

export default TextInput;
