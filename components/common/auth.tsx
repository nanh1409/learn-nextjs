import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/use-auth';
import { useRouter } from 'next/router';

export interface AuthProps {
  children: any;
}

export function Auth({ children }: AuthProps) {
  const router = useRouter();
  const { profile, firstLoading } = useAuth();

  useEffect(() => {
    if (!firstLoading && !profile?.username) router.push('/login');
  }, [router, profile, firstLoading]);

  if (!profile?.username) {
    return <p>Loading...</p>;
  }

  return <div>{children}</div>;
}
