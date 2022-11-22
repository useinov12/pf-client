import { Dispatch, createContext, useReducer, useContext } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

import {
  Credentials,
  createNewUser as apiCreateNewUser,
  loginUser as apiLoginUser,
  LoginCredentials,
} from './api';

export async function register(signUpCred: Credentials){
  try {
    const { status } = await apiCreateNewUser(signUpCred);
    toast.success('You are successfully registered!');
    return { status:status };
  } catch (error: any) {
    if (error.response.status === 404) {
      toast.error(error.response.data.detail.message);
    } else {
      toast.error('An unexpected error occurred :(  Try again.');
    }
    return {status:error.response.status}
  }
}

export async function login(loginCred: LoginCredentials) {
  try {
    const { data } = await apiLoginUser(loginCred);
    Cookies.set('token', data.detail.data.access_token, { secure: true });
    toast.success('Successfull login');
  } catch (error: any) {
    if (error.response.status === 403) {
      toast.error('The email address or password you entered is invalid');
    } else {
      toast.error('An unexpected error occurred :(  Try again.');
    }
  }
}

interface User {
  username: string;
  first_name: string;
  last_name: string;
}

interface UserState {
  user: User;
}

type UserStateActions =
  | { type: 'SUCCESSFUL_LOGIN' }
  | { type: 'FAILED_LOGIN' }
  | { type: 'SUCCESSFUL_MUTATE' }
  | { type: 'FAILED_MUTATE' };

interface UserContextShape extends UserState {
  dispatch: Dispatch<UserStateActions>;
  setUser: (user: User | null) => void;
  login: (credentials: LoginCredentials) => void;
}

const initialState: UserContextShape = {
  user: {
    username: '',
    first_name: '',
    last_name: '',
  },
  login: () => {},
  dispatch: () => {},
  setUser: () => {},
};

/**
 * @desc()
 * */
const UserContext = createContext<UserContextShape>(initialState);

/**
 * @desc()
 * */
export function UserProvider(props: any) {
  const [userState, dispatch] = useReducer(reducer, initialState);

  return <UserContext.Provider value={{}} {...props} />;
}

function reducer(state: UserState, action: UserStateActions | any) {
  switch (action.type) {
    case 'SUCCESSFUL_LOGIN':
      return state;
    default:
      console.warn('unknown action: ', action.type, action.payload);
      return state;
  }
}
/**
 * @desc()
 * */
export default function useCurrentUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(`useUsers must be used within a UsersProvider`);
  }

  return context;
}
