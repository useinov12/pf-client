import logger from '@/lib/logger';
import { toast } from 'react-hot-toast';
import { getConnectedBanks as apiGetConnectedBanks } from '../api/api';

export async function getConnectedBanks() {
  try {
    const { data } = await apiGetConnectedBanks();
    logger(data, 'Connected banks data');
    return data;
  } catch (e) {
    logger(e, 'Could not get connected banks');
  }
}
