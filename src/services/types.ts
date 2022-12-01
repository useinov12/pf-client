

/* ================ USER ================ */
export interface RegisterCredentials {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
}
export type LoginCredentials = Pick<
  RegisterCredentials,
  'username' | 'password'
>;

export type User = {
  firstName: string;
  lastName: string;
  username: string;
};

export interface UserContextShape {
  user: User | null;
  handleSetUser:(data:GetCurrentUserResponse)=>void
}


/* ================ PLAID ================ */
export type GetCurrentUserResponse = {
  data: {
    detail: {
      message: string;
      data: {
        first_name: string;
        last_name: string;
        username: string;
      };
    };
  };
};

export type getTokenResponse = { // test this type when backend is ready
  data: {
    detail: {
      message: string;
      data: string;
    };
  };
};

