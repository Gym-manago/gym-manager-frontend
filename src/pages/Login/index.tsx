import { Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '~/store/slice/userSlice';
import styles from './styles.module.scss';
import logo from '../../assets/logo.jpeg';

interface UserData {
  username: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const { handleSubmit, control, formState } = useForm<UserData>();
  const navigate = useNavigate();

  const handleLogin = (values: UserData) => {
    const formData = new FormData();

    formData.append('username', values.username);
    formData.append('password', values.password);

    fetch(`${import.meta.env.VITE_BASE_URL}auth/login`, {
      method: 'POST',
      body: formData,
    })
      .then(async (data) => {
        const {
          access_token: token,
          username,
          email,
          detail,
        } = (await data.json()) as {
          access_token: string;
          username: string;
          email: string;
          detail: string;
        };
        if (data.status === 200) {
          dispatch(login({ username, token, email }));
          localStorage.setItem(
            'user',
            JSON.stringify({ username, token, email })
          );
          navigate('/');
        } else {
          toast.error(detail, {
            theme: 'light',
          });
        }
      })
      .catch((e) => {
        console.error(e);
        toast.error('Try again!', {
          theme: 'light',
        });
      });
  };

  return (
    <div className={styles.main_container}>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className={styles.form_container}
      >
        <div className={styles.logo_container}>
          <img src={logo} className={styles.logo} />
          City Gym Manager
        </div>
        <Controller
          control={control}
          name='username'
          render={({ field }) => (
            <TextField label='Username' {...field} required />
          )}
        />
        <Controller
          control={control}
          name='password'
          render={({ field }) => (
            <TextField label='Password' {...field} type='password' required />
          )}
        />
        <Button
          type='submit'
          variant='contained'
          disabled={formState.isLoading}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
