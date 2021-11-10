import Layout from '../../components/layout'
import { getAllPostIds, getLinkedPostsId, getPostData, isExistingPost } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import 'highlight.js/styles/androidstudio.css'
import Badge from '../../components/badge'

export default function Post({
  postData,
  prevPostId,
  nextPostId
}: {
  postData: {
    title: string
    date: string
    contentHtml: string
    tags: string[]
  },
  prevPostId: string,
  nextPostId: string
}) {
  return (
    <Layout prevPostId={prevPostId} nextPostId={nextPostId}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <br />
        <div>
          Related Tags : {postData.tags?.map((tag, idx) => (<Badge color='white' key={idx}>{tag}</Badge>))}
        </div>
        <hr></hr>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        <p>Thanks for reading ❤️</p>
        <style jsx>{`
          p {
            font-weight: bold;
            text-align: center;
          }
        `}</style>
        <hr></hr>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);

  const linkedPosts = getLinkedPostsId(params?.id as string);

  const prevPostId = isExistingPost(linkedPosts.prev as string) ? linkedPosts.prev : null;
  const nextPostId = isExistingPost(linkedPosts.next as string) ? linkedPosts.next : null;
  return {
    props: {
      postData,
      prevPostId,
      nextPostId
    }
  }
}