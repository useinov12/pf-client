import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

import {
  createNewUser as apiCreateNewUser,
  loginUser as apiLoginUser,
  getMe as apiGetMe,
} from './api';

import { useRouter } from 'next/router';
import {
  GetCurrentUserResponse,
  User,
  UserContextShape,
  RegisterCredentials,
  LoginCredentials,
} from './types';

import Loading from '@/components/Loading';



/**
 * **Sends Post request to Server**\
 * Notifies user about results of the request with `toast`
 * @description `register` is an `Action` - API call that
 * does not have an effect on cached entity data
 * @param {RegisterCredentials} Credentials
 * @returns {number} `Status Code`
 * */
export async function register(signUpCred: RegisterCredentials) {
  try {
    const { status } = await apiCreateNewUser(signUpCred);
    toast.success('You are successfully registered!');
    return { status: status };
  } catch (error: any) {
    if (error.response.status === 404) {
      toast.error(error.response.data.detail.message);
    } else {
      toast.error('An unexpected error occurred :(  Try again.');
    }
    return { status: error.response.status };
  }
}

/**
 * **Login user**\
 * Sets JWT as a cookie\
 * Notifies user about results of the request with `toast`\
 * **@description** `login` is an `Action` - API call that
 * does not have an effect on cached entity data
 * @param {LoginCredentials} LoginCredentials
 * @returns {number} `Status Code`
 */
export async function login(loginCred: LoginCredentials) {
  try {
    const { status, data } = await apiLoginUser(loginCred);
    Cookies.set('token', data.detail.data.access_token, { secure: true });
    console.log(data.detail.data.access_token);
    toast.success('Successfull login');
    return { status: status };
  } catch (error: any) {
    if (error.response.status === 403) {
      toast.error('The email address or password you entered is invalid');
    } else {
      toast.error('An unexpected error occurred :(  Try again.');
    }
    return { status: error.response.status };
  }
}

// Static protected routes implementation
// https://dev.to/ivandotv/protecting-static-pages-in-next-js-application-1e50
// https://github.com/ivandotv/nextjs-client-signin-logic/blob/main/src/components/AuthProvider.tsx


const queryClient = new QueryClient();

// const initial = { user: null, setUser: () => {} };
const initial = { user: null, handleSetUser: () => {} };

export const UserContext = createContext<UserContextShape>(initial);

export const useUser = () => useContext(UserContext);

export function UserProvider(props: any) {
  const [user, setUser] = useState<User | null>();

  const handleSetUser = (data: GetCurrentUserResponse) => {
    const user = formatUserApiResponse(data);
    setUser(user);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ handleSetUser, user }} {...props} />;
    </QueryClientProvider>
  );
}


/**
 * Protected routes for static pages implementation\
 * Reference: 
 * [Blog](https://dev.to/ivandotv/protecting-static-pages-in-next-js-application-1e50) | 
 * [Github example](https://github.com/ivandotv/nextjs-client-signin-logic)
 */
export function AuthGuard({ children }: { children: JSX.Element }) {
  const router = useRouter();
  const { user, handleSetUser } = useUser();

  // // if no user in Context -> get Current User from the Server
  // !user && withQueryUser({children})
  // // if user in context -> render page
  // return <>{children}</>;

  return user ? <>{children}</> : WithUserQuery({children})
}

export const useQueryCurrentUser = () => {
  return useQuery({ queryKey: ['user'], queryFn: apiGetMe, retry: 3 });
};


const WithUserQuery = ({children}:{children:JSX.Element }) => {
  const router = useRouter();
  const { data, isLoading, isSuccess } = useQueryCurrentUser();
  const { handleSetUser } = useUser();
    
    useEffect(() => {
      if (!isLoading) {
        //auth is initialized and there is no user
        if (!data) {
          // remember the page that user tried to access
          // setRedirect(router.route)
          router.push('/');
        }
      }
    }, [isLoading, router, data]);
  
    if (isLoading) {
      return <Loading />;
    }
  
    if (!isLoading && isSuccess && data) {
      handleSetUser(data);
      return <>{children}</>;
    }
  
    return <Loading />;
}


export function formatUserApiResponse(data: GetCurrentUserResponse): User {
  return {
    firstName: data.data.detail.data.first_name,
    lastName: data.data.detail.data.last_name,
    username: data.data.detail.data.username,
  };
}