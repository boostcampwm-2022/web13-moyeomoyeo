import axios from 'axios';

const getTestData = async (nextId: number) => {
  return axios.get(`https://testServer/test`, {
    params: { limit: 5, nextId },
  });
};

export default getTestData;
