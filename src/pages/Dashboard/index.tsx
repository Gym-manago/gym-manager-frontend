import { Layout } from "../../components";
import logo from "/logo.jpeg";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <Layout headerTitle="Dashboard" onBack={() => navigate(-1)}>
      <img src={logo} className={styles.img} />
      <h1>Hello Ma!!</h1>
    </Layout>
  );
};
