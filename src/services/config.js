import axios from 'axios';

export const yemakTestUzApi = axios.create({
  baseURL: `https://api.yemak-test.uz/`,
});
