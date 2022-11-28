import axios from 'axios';

const getTestMyGroupArticles = async (nextId: number) => {
  return axios.get('http://testServer/group-articles/me', {
    params: { nextId, limit: 5 },
  });
};

export default getTestMyGroupArticles;
