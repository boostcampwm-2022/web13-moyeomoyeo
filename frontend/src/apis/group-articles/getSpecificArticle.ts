import axios from 'axios';

const getSpecificArticle = async (id: number) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/group-articles/${id}`, {
    params: { id },
    withCredentials: true,
  });
};

export default getSpecificArticle;
