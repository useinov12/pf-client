import logger from '@/lib/logger';
import { useQuery } from 'react-query';
import { getConnectedBanks as apiGetConnectedBanks } from '../api';

export const useConnectedBanks = () => {
  return useQuery(['banks'], apiGetConnectedBanks, {
    onSuccess: (response) => {
      logger(response, 'Connected banks response');
      // structure data
    },
    // refetch:false
  });
};
