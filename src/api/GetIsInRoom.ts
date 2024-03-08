import axios from 'axios';

export type IsInRoom = {
    message: Boolean;
    error?: string;
};

const host = process.env.REACT_APP_API_HOST

export const getIsInRoom = async (campaignToken: string): Promise<IsInRoom> => {
  const response = await axios.get<IsInRoom>(host + `/room/isInRoom/${campaignToken}`, {withCredentials: true});
  return response.data;
};