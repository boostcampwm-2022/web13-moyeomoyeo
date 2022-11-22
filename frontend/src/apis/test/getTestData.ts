import axios from 'axios';

const getTestData = async (nextId: number) => {
  return await axios.get(`/test`, {
    params: { limit: 5, nextId },
  });
};

export default getTestData;
