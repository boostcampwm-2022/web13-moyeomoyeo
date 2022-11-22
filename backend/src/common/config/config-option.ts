export const getEnvironmentFilePath = (): string => {
  return process.env.NODE_ENV === 'test' ? '.env.test' : '.env.development';
};

export const isIgnoreEnvFile = () => {
  return process.env.NODE_ENV === 'production';
};
