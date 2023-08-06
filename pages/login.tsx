import * as React from 'react';
import { authApi } from '../api-client/auth-api';
import { useAuth } from '../hooks/use-auth';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();
  const { profile, login, logout } = useAuth({
    revalidateOnMount: false,
  });

  async function handleLogin() {
    try {
      await login();
      console.log('Redirect to dashboard');
      router.push('/about');
    } catch (err) {
      console.log('Failed to login', err);
    }
  }

  async function handleGetProfile() {
    try {
      await authApi.getProfile();
    } catch (err) {
      console.log('Failed to get profile', err);
    }
  }

  async function handleLogout() {
    try {
      await logout();
      console.log('Redirect to login page');
    } catch (err) {
      console.log('Failed to get profile', err);
    }
  }

  return (
    <div>
      <h1>Login Page</h1>

      <p>Profile: {JSON.stringify(profile || {}, null, 4)}</p>

      <button onClick={handleLogin}>Login</button>
      {/* <button onClick={handleGetProfile}>Get Profile</button> */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
