import axios from 'axios';

export type ForgotPasswordRequest = {
    email: string;
};
  
export type ForgotPasswordResponse = {
    message: string;
    error?: string;
};

const host = process.env.REACT_APP_API_HOST;

export const postSendEmail = async (request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
    const response = await axios.post<ForgotPasswordResponse>(host + `/user/forgot-password`, request, {withCredentials: true});
    return response.data;
};