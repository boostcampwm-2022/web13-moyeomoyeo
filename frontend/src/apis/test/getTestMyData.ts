import axios from 'axios';

const getTestUserData = async () => {
  return axios.get(`http://testServer/my-info`);
};

export default getTestUserData;
