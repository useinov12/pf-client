import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import logger from '@/lib/logger';

import { getMe } from '../api/api';
import { CurrentUserData } from '../types';
import { UserInContext } from '../types';

/* https://www.smashingmagazine.com/2022/01/building-real-app-react-query/ */
export const useAuth = () => {
  return useQuery('user', getMe, {
    // refetchOnWindowFocus: false,
    enabled: false, // needed to handle refetchs manually
    retry: false,
    onSuccess: (data) => {
      logger(data, '🟢 onSucces useQuery CB');
    },
    onError: async () => {
      const response = await getMe();
      logger(response, '🔴 onError useQuery CB');
    },
    select: (data: AxiosResponse<CurrentUserData, any>) =>
      formatUserApiResponse(data),
    useErrorBoundary: true,
  });
};

/* Format user API response  */
export function formatUserApiResponse(
  data: AxiosResponse<CurrentUserData>
): UserInContext {
  return {
    firstName: data.data.detail.data.first_name,
    lastName: data.data.detail.data.last_name,
    username: data.data.detail.data.username,
  };
}
