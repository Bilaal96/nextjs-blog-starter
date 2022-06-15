import React from 'react';

// Components
import Head from 'next/head';

import Layout from '../../components/layout';
import Date from '../../components/date';

// Utils
import { getAllPostIds, getPostData } from '../../lib/posts';

// Styles
import utilStyles from '../../styles/utils.module.css';

// Types
import { PostData } from '../../types';
import { GetStaticPaths, GetStaticProps } from 'next';

interface PostProps {
  postData: PostData;
}

export default function Post({ postData }: PostProps) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <header className="post-head">
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
        </header>

        <section
          className="post-body"
          dangerouslySetInnerHTML={{ __html: postData.content }}
        />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);

  return {
    props: {
      postData,
    },
  };
};
