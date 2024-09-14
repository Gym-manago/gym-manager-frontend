import { useLocation } from "react-router-dom";
import NavItems from "./components/NavItems";
import styles from "./styles.module.scss";
import { People, Dashboard } from "@mui/icons-material";
import logo from "../../assets/logo.jpeg";

export const SideNav = () => {
  const tabs = [
    { label: "Dashboard", path: "/dashboard", icon: <Dashboard /> },
    { label: "Members", path: "/members", icon: <People /> },
  ];
  const location = useLocation();
  return (
    <div className={styles.main_container}>
      <span className={styles.logo_container}>
        <img src={logo} className={styles.logo} />
        City Gym Manager
      </span>
      <hr />
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
    </div>
  );
};
