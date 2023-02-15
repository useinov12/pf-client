import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import logger from '@/lib/logger';

import { InitialData } from '@/constant/demo-data/demoData';
import { ConnectedBanksData } from '@/services/types';

import {
  getConnectedBanks as apiGetConnectedBanks,
  nextApiGetDemoBanks,
} from '../api/api';

export const useConnectedBanks = () => {
  return useQuery(['banks'], apiGetConnectedBanks, {
    onSuccess: (response) => {
      logger(response, 'Connected banks response');
      // structure data
    },
    select: (response: AxiosResponse<ConnectedBanksData, unknown>) =>
      response.data.detail.data,
    // enabled: false, // disable this query from automatically running
  });
};

export function useDemoBanks() {
  return useQuery(['demoData'], nextApiGetDemoBanks, {
    onSuccess: (response) => {
      // structure data
      logger(response, 'DEMO DATA LOADED');
    },
    select: (response: AxiosResponse<InitialData, any>) => {
      logger(response, 'DEMO DATA SELECTED');
      return response.data;
    },
    enabled: false, // needed to handle refetchs manually
  });
}
