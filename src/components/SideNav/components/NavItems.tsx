import { Link } from "react-router-dom";
import styles from "../styles.module.scss";
import { ReactNode } from "react";

interface Props {
  label: string;
  path: string;
  isActive?: boolean;
  icon: ReactNode;
}

const NavItems = ({ label, isActive, path, icon }: Props) => {
  return (
    <Link
      to={path}
      className={`${styles.nav_items} ${isActive ? styles.active : ""}`}
    >
      <div className={styles.tab_content}>
        {icon} {label}
      </div>
    </Link>
  );
};

export default NavItems;
