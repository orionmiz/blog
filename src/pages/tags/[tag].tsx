import Layout from '../../components/layout'
import { getAllTags, getSortedPostsDataByTag, PostData } from '../../lib/posts'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import 'highlight.js/styles/androidstudio.css'
import PostList from '../../components/postlist'

export default function Tag({
  relatedPostsData,
  tag
}: {
  relatedPostsData: PostData[],
  tag: string
}) {
  return (
    <Layout>
      <Head>
        <title>{`All posts related to '${tag}'`}</title>
      </Head>
      <PostList postsData={relatedPostsData} tag={tag}/>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllTags()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const relatedPostsData = getSortedPostsDataByTag(params?.tag as string)
  return {
    props: {
      relatedPostsData,
      tag: params?.tag
    }
  }
}