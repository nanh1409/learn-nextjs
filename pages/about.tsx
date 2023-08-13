import { useRouter } from 'next/router';
import * as React from 'react';
import { useState, useEffect } from 'react';
// import Header from '../components/common/header';
import { AdminLayout, MainLayout } from '../components/layout';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export interface AboutPageProps {}

export default function AboutPage() {
  const [postList, setPostList] = useState([]);
  const router = useRouter();
  console.log('About query: ', router.query);
  const page = router.query.page;

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`);
      const data = await response.json();

      setPostList(data.data);
    })();
  }, [page]);

  if (!page) return;

  function handleNextPage() {
    router.push(
      {
        pathname: '/about',
        query: {
          page: (Number(page) || 1) + 1,
        },
      },
      undefined,
      { shallow: true },
    );
  }

  return (
    <div>
      <h1 style={{ fontWeight: 'bold', fontSize: '50px' }}>About Page</h1>

      <ul className="post-list">
        {postList?.map((post: any) => (
          <li key={post.id}>
            <Link href={`/test/${post.id}`}>
              {post.id} - {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <button className={styles.button} onClick={handleNextPage}>
        Next page
      </button>
    </div>
  );
}

AboutPage.Layout = AdminLayout;

export async function getStaticProps() {
  return {
    props: {},
  };
}
