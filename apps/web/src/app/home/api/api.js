import axios from 'axios';
import { baseUrl } from '@/utils/config';

export async function eventList({ category }) {
  let res = await axios.get(`${baseUrl}/events?category=${category}`);
  return res.data.data;
}
