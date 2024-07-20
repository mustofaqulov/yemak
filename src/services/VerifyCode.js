import { yemakTestUzApi } from './config';

export const verifyCode = async ({ code, token }) => {
  const response = await yemakTestUzApi.get(`user/auth/verify?code=${code}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data;
};
