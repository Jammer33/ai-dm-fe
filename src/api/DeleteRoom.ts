import axios from 'axios';

const host = process.env.REACT_APP_API_HOST

export type DeleteRoomResponse = {
  message: string;
  error?: string;
};

export const deleteRoom = async (campaignToken: string): Promise<DeleteRoomResponse> => {
  const response = await axios.delete<DeleteRoomResponse>(host + `/room/${campaignToken}`, {withCredentials: true});
  return response.data;
};