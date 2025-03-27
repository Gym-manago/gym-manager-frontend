import style from './styles/App.module.scss';
import { SideNav } from './components';
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Dashboard, Members, MembersDetails, MembersList } from './pages';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from './store/selectors';
import Login from './pages/Login';
import { useMount } from 'react-use';
import { login } from './store/slice/userSlice';
// import dotenv from 'dotenv';
// dotenv.config();

function App() {
  const { token } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useMount(() => {
    const userData = localStorage.getItem('user');
    if (!token && !userData) return navigate('/login');
    if (userData) dispatch(login(JSON.parse(userData)));
  });

  return (
    <Routes>
      <Route
        index
        path='/'
        element={<Navigate to={token ? '/app/dashboard' : '/login'} />}
      />
      <Route path='/login' element={<Login />} />
      <Route path='/app' element={<AppWrapper />}>
        <Route index element={<Navigate to='dashboard' />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='members' element={<Members />}>
          <Route index element={<MembersList />} />
          <Route path=':id' element={<MembersDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

const AppWrapper = () => (
  <div className={style.main_container}>
    <SideNav />
    <section className={style.main_content}>
      <Outlet />
    </section>
  </div>
);
