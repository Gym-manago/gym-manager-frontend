import { store } from '.';

export interface UserData {
  email: string;
  username: string;
  token: string;
}

export type UserRootState = ReturnType<typeof store.getState>;
