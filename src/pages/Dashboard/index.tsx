import { Layout } from "../../components";
import logo from "/logo.jpeg";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <Layout headerTitles={["Dashboard"]} onBack={() => navigate(-1)}>
            <div className={styles.container}>
                <img src={logo} className={styles.img} />
                <h1>Welcome to Chirawa City GYM Manager</h1>
            </div>
        </Layout>
    );
};
