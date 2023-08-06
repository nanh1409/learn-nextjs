import { useRouter } from 'next/router';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Header from '../components/common/header';
import { AdminLayout, MainLayout } from '../components/layout';
// import dynamic from 'next/dynamic';

// const Header = dynamic(() => import('../components/common/header'), {
//   ssr: true,
// });
export interface AboutPageProps {}

export default function AboutPage() {
  const [postList, setPostList] = useState([]);
  const router = useRouter();
  console.log('About query: ', router.query);
  const page = router.query.page;

  useEffect(() => {
    if (!page) return;

    (async () => {
      const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`);
      const data = await response.json();

      setPostList(data.data);
    })();
  }, [page]);

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
      <h1>About Page</h1>
      <Header />

      <ul className="post-list">
        {postList.map((post: any) => (
          <li key={post.id}>
            {post.id} - {post.title}
          </li>
        ))}
      </ul>
      <button onClick={handleNextPage}>Next page</button>
    </div>
  );
}

AboutPage.Layout = AdminLayout;

export async function getStaticProps() {
  console.log('get Static Props');
  return {
    props: {},
  };
}
