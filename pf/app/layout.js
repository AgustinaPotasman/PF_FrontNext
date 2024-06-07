import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
            <nav className={styles.nav}>
                <li><Link href="/informacion"  className={styles.label}>Informacion</Link></li>
                <li><Link href="/" className={styles.label}>Proximo turno</Link></li>
                <li><Link href="/" className={styles.label}>Perfil</Link></li>
                <li><Link href="/" className={styles.label}>Mensajes</Link></li>
            </nav>
           {children}
      </body>
      </html>
  );
}
