import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/Main.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { UserProvider } from './contexts/Users.tsx';
import UserStoreProvider from './store/provider.tsx';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserStoreProvider>
        <UserProvider>
          <App />
          <ToastContainer />
        </UserProvider>
      </UserStoreProvider>
    </BrowserRouter>
  </StrictMode>
);
