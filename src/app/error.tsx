"use client";

import { NextPage } from 'next';
import styles from "../../styles/ErrorPage.module.css"
import { ErrorProps } from '../../interfaces/interfaces';

const ErrorPage: NextPage<ErrorProps> = ({ error }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Something went wrong</h1>
            <p className={styles.message}>{error.message}</p>
        </div>
    );
};

export default ErrorPage;
