import { useLocation, useNavigate } from 'react-router-dom';
import NavItems from './components/NavItems';
import styles from './styles.module.scss';
import { People, Dashboard, LogoutRounded } from '@mui/icons-material';
import logo from '../../assets/logo.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '~/store/selectors';
import { logout } from '~/store/slice/userSlice';

export const SideNav = () => {
  const tabs = [
    { label: 'Dashboard', path: '/app/dashboard', icon: <Dashboard /> },
    { label: 'Members', path: '/app/members', icon: <People /> },
  ];
  const location = useLocation();
  const { email } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={styles.main_container}>
      <span className={styles.logo_container}>
        <img src={logo} className={styles.logo} />
        City Gym Manager
      </span>
      <hr />
      <div className={styles.content_container}>
        <ul className={styles.tabs_group}>
          {tabs.map(({ label, path, icon }) => (
            <NavItems
              key={label}
              label={label}
              path={path}
              isActive={location.pathname == path}
              icon={icon}
            />
          ))}
        </ul>
        <span className={styles.logout_container}>
          <p>{email}</p>
          <div
            className={styles.logout_logo}
            onClick={() => {
              dispatch(logout());
              localStorage.removeItem('user');
              navigate('/login');
            }}
          >
            <LogoutRounded />
          </div>
        </span>
      </div>
    </div>
  );
};
