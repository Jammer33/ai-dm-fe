import axios from 'axios';

export type VerifyResponse = {
    message: string;
    email?: string;
};

const host = process.env.REACT_APP_API_HOST;


export const getVerify = async (): Promise<VerifyResponse> => {
  const response = await axios.get<VerifyResponse>(host + `/user/verify`, {withCredentials: true});
  return response.data;
};