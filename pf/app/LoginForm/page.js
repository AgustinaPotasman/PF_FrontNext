"use client";

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { UserContext } from "../components/UserContext/UserContext";
import Footer from './Components/footer'

export default function LoginForm() {
  const [activeTab, setActiveTab] = useState('login');
  const { setUser } = useContext(UserContext);  
  const router = useRouter();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      name: "carla",
      email: "carla@gmail.com",
    };
    localStorage.setItem('user', JSON.stringify(user));  
    setUser(user);  
    router.push('/');  
  };

  return (
    <>
    <div className={styles.body}>
    <div className={styles.container}>
      <ul className={styles.navPills} role="tablist">
        <li className={styles.navItem} role="presentation">
          <a
            className={`${styles.navLink} ${activeTab === 'login' ? styles.navLinkActive : ''}`}
            href='#'
            role="tab"
            aria-selected={activeTab === 'login'}
            onClick={() => handleTabChange('login')}
          >
            Login
          </a>
        </li>
        <li className={styles.navItem} role="presentation">
          <a
            className={`${styles.navLink} ${activeTab === 'register' ? styles.navLinkActive : ''}`}
            href='#'
            role="tab"
            aria-selected={activeTab === 'register'}
            onClick={() => handleTabChange('register')}
          >
            Register
          </a>
        </li>
      </ul>

      <div className={styles.tabContent}>
        {activeTab === 'login' && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="loginEmail">Email or username</label>
              <input type="email" id="loginEmail" className={styles.formControl} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="loginPassword">Password</label>
              <input type="password" id="loginPassword" className={styles.formControl} required />
            </div>
            <button type="submit" className={styles.btnPrimary}>Sign in</button>
          </form>
        )}

        {activeTab === 'register' && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="registerName">Name</label>
              <input type="text" id="registerName" className={styles.formControl} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="registerUsername">Username</label>
              <input type="text" id="registerUsername" className={styles.formControl} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="registerEmail">Email</label>
              <input type="email" id="registerEmail" className={styles.formControl} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="registerPassword">Password</label>
              <input type="password" id="registerPassword" className={styles.formControl} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="registerRepeatPassword">Repeat password</label>
              <input type="password" id="registerRepeatPassword" className={styles.formControl} />
            </div>
            <div className={styles.checkboxGroup}>
              <input className={styles.checkbox} type="checkbox" id="registerCheck" defaultChecked />
              <label className={styles.checkboxLabel} htmlFor="registerCheck">
                I have read and agree to the terms
              </label>
            </div>
            <button type="submit" className={styles.btnPrimary}>Sign up</button>
          </form>
        )}
      </div>
    </div>
    <Footer/>
    </div>
    </>
  );
}