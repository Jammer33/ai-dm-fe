import axios from 'axios';

export type LoginResponse = {
    message: string;
    userToken: string;
    error?: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

const host = process.env.REACT_APP_API_HOST;


export const postLogin = async (request: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(host + `/user/login`, request, {withCredentials: true});
  return response.data;
};