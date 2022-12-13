import { getPlaiceholder } from 'plaiceholder';

export const getBlurImage = async (thumbnail: string) => {
  let blurUrl = '';
  try {
    const { base64 } = await getPlaiceholder(thumbnail);
    blurUrl = base64;
  } catch (e) {}

  return blurUrl;
};
