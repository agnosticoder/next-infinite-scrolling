import type { NextPage } from 'next'
import App from '../components/App.js';
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <App />
        </div>
    );
};

export default Home
