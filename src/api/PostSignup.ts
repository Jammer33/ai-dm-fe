import axios from 'axios';

export type SignupResponse = {
    message: string;
    error?: string;
};

export type SignupRequest = {
    email: string;
    password: string;
};

const host = process.env.REACT_APP_API_HOST || 'localhost';


export const postSignup = async (request: SignupRequest): Promise<SignupResponse> => {
  const response = await axios.post<SignupResponse>(`https://localhost:3001/user/signup`, request, {withCredentials: true});
  return response.data;
};