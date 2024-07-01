import React from 'react';
import styles from './footer.module.css';

export default function Footer() {
    return (
        <footer class="footer">
        <div class="nav-icon">
            <img src="" alt="User Icon" />
        </div>
        <div class="nav-icon">
            <img src="home-icon.png" alt="Home Icon" />
        </div>
        <div class="nav-icon">
            <img src="clock-icon.png" alt="Clock Icon" />
        </div>
        <div class="indicator"></div>
    </footer>
    );
}
