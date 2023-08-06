import React from 'react';
// import dynamic from 'next/dynamic';
import { LayoutProps } from '../../models/common';
import Link from 'next/link';

// const Header = dynamic(() => import('../common/header'), { ssr: false });

export function MainLayout({ children }: LayoutProps) {
  return (
    <div>
      <h1>Main Layout</h1>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <div>{children}</div>
    </div>
  );
}
