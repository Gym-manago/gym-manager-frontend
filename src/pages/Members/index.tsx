import { Layout } from "../../components";
import logo from "/logo.jpeg";
import styles from "./styles.module.scss";

export const Members = () => {
  return (
    <Layout headerTitle="Members">
      <img src={logo} className={styles.img} />
      <h1>Hello Pa!!</h1>
    </Layout>
  );
};
