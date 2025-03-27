import { UserRootState } from './types';

export const userSelector = (state: UserRootState) => state.user;
