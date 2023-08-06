import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface TestPage {
  posts: any[];
}

export default function Test({ posts }: TestPage) {
  // console.log('posts', posts);
  return (
    <div>
      <h1>Test Page</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/test/${post.id}`}>
              {post.id} - {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<TestPage> = async (context: GetStaticPropsContext) => {
  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
  const data = await response.json();
  console.log(data);
  return {
    props: {
      posts: data.data.map((x: any) => ({ id: x.id, title: x.title })),
    },
  };
};
