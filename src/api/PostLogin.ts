import axios from 'axios';

export type LoginResponse = {
    message: string;
    error?: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

const host = process.env.REACT_APP_API_HOST || 'localhost';


export const postLogin = async (request: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`https://localhost:3001/user/login`, request, {withCredentials: true});
  return response.data;
};