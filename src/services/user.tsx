import { Dispatch, createContext, useReducer, useContext } from 'react';

import {
  Credentials,
  createNewUser as apiCreateNewUser,
  LoginCredentials,
} from './api';

/**
 * @desc()
 * */
export async function registerUser(signUpCred: Credentials) {
  try {
    const { status, data } = await apiCreateNewUser(signUpCred);
    return { status, data, message: 'You are successfully registered!' };
  } catch (error: any) {
    if (error.response.status === 404) {
      console.log(error);
      return {
        status: error.response.status,
        data: error.response.data,
        message: error.response.data.detail.message,
      };
    } else {
      return {
        status: error.response.status,
        data: error.response.data,
        message: 'An unexpected error occurred :(  Try again.',
      };
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
