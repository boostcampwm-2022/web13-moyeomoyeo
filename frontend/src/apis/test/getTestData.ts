import axios from 'axios';

const getTestData = async (nextId: number) => {
  return axios.get(`http://localhost:3000/test`, {
    params: { limit: 5, nextId },
  });
};

export default getTestData;
