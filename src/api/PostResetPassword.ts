import axios from 'axios';

export type ResetPasswordResponse = {
    message: string;
    error?: string;
};

export type ResetPasswordRequest = {
    password: string;
};

const host = process.env.REACT_APP_API_HOST


export const postResetPassword = async (request: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
  const response = await axios.post<ResetPasswordResponse>(host + `/user/reset-password`, request, {withCredentials: true});
  return response.data;
};