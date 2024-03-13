import axios from 'axios';

export type Rooms = {
    message: string;
    error?: string;
};

const host = process.env.REACT_APP_API_HOST

export const getRooms = async (): Promise<Rooms> => {
  const response = await axios.get<Rooms>(host + `/room`, {withCredentials: true});
  return response.data;
};