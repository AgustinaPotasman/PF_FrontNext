import React from 'react';
import styles from './timer.module.css';

export default function Timer() {
    return (
        <div className={styles.timer}>
            <div className={styles.circle}>
                <span className={styles.time}>45</span>
                <span className={styles.minutes}>minutos</span>
            </div>
        </div>
    );
}
