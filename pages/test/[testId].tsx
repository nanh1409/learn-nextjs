import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface TestDetailProps {
  data: any;
}

export default function TestDetail({ data }: TestDetailProps) {
  const router = useRouter();
  if (router.isFallback) {
    return <div style={{ fontSize: '2rem', textAlign: 'center' }}>Loading...</div>;
  }
  // console.log(router.isFallback);
  if (!data) return null;
  return (
    <div>
      <h1>Test Detail Page</h1>
      {/* <p>Test Query: {JSON.stringify(router.query)}</p> */}
      <p>{data.title}</p>
      <p>{data.author}</p>
      <p>{data.description}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('\nGET STATIC PATHS');
  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
  const data = await response.json();

  return {
    paths: data.data.map((post: any) => ({ params: { testId: post.id } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TestDetailProps> = async (
  context: GetStaticPropsContext,
) => {
  console.log('\nGET STATIC PROPS ', context.params?.testId);
  const testId = context.params?.testId;
  if (!testId) return { notFound: true };

  const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${testId}`);
  const data = await response.json();

  return {
    props: {
      data: data,
    },
    revalidate: 5,
  };
};
