import { clientAxios } from '@utils/commonAxios';

const getSpecificArticle = async (id: number) => {
  return clientAxios.get(`/v1/group-articles/${id}`);
};

export default getSpecificArticle;
