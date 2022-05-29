import config from '../appconfig.json';
import apiCall from './apiCall';

//Login
export const login = async (email, password) => {
  const loginRequestConfig = {
    url: `${config.api}user/login`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { email, password },
  };
  const result = await apiCall(loginRequestConfig);
  return result;
};

//Signup
export const signup = async (formData) => {
  const signupRequestConfig = {
    url: `${config.api}user/signup`,
    method: 'POST',
    formData,
  };
  const result = await apiCall(signupRequestConfig);
  return result;
};

//Send twitt
export const sendTwitt = async (formData) => {
  const sendTwittRequestConfig = {
    url: `${config.api}twitt`,
    method: 'POST',
    formData: formData,
  };
  const sentTwittResult = await apiCall(sendTwittRequestConfig);
  return sentTwittResult;
};
