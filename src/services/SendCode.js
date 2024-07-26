import { yemakTestUzApi } from './config.js';

export const sendVerificationCode = async (phoneNumber) => {
  // console.log(phoneNumber.split('').join(''));
  const formattedPhone = phoneNumber.replace(/\s+/g, '').slice(-9);
  const response = await yemakTestUzApi.get(`user/auth?phone_number=${formattedPhone}`);
  console.log(formattedPhone);
  return response.data.data.access_token;
};
