import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '.';

const UserStoreProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default UserStoreProvider;
