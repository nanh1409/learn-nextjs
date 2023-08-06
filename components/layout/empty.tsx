import React from 'react';
// import dynamic from 'next/dynamic';
import { LayoutProps } from '../../models/common';
// import Link from 'next/link';

// const Header = dynamic(() => import('../common/header'), { ssr: false });

export function EmptyLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
