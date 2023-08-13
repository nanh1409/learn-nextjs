import React from 'react';
// import dynamic from 'next/dynamic';
import { LayoutProps } from '../../models/common';
import Link from 'next/link';
import { Auth } from '../common';
import { useAuth } from '../../hooks/use-auth';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css';

// const Header = dynamic(() => import('../common/header'), { ssr: false });

export function AdminLayout({ children }: LayoutProps) {
  const { logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    try {
      await logout();
      console.log('Redirect to login page');
      router.push('/login');
    } catch (err) {
      console.log('Failed to get profile', err);
    }
  }

  return (
    <Auth>
      <div>{children}</div>

      <button className={styles.button} onClick={handleLogout}>
        Logout
      </button>

      <button className={styles.button}>
        <Link href="/">Home</Link>
      </button>
      <button className={styles.button}>
        <Link href="/about">About</Link>
      </button>
    </Auth>
  );
}
