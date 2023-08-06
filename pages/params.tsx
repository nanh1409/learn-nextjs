import { useRouter } from 'next/router';
import * as React from 'react';

export interface ParamsProps {}

export default function Params(props: ParamsProps) {
  const router = useRouter();

  return (
    <div>
      <h1>Params Page</h1>
      <p>Query:{JSON.stringify(router.query)}</p>
    </div>
  );
}

export async function getSeverSideProps() {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  return {
    props: {},
  };
}
