import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData, PostData } from '../lib/posts'
import { GetStaticProps } from 'next'
import Github from '../components/github'
import PostList from '../components/postlist'

export default function Home({
  allPostsData
}: {
  allPostsData: PostData[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Welcome to my personal blog :)</p>
        <p>
          This blog is built with <a href='https://nextjs.org' className='externalLink'>Next.js</a>
        </p>
        <div className='channelContainer'>
          <a href='https://github.com/orionmiz' className='channel'>
            <Github/>
            <div>Github</div>
          </a>
        </div>
      </section>
      <PostList postsData={allPostsData}/>
      <style jsx>{`
        p, .channelContainer {
          text-align: center;
        }
        .channel {
          display: inline-flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
        .channel > div {
          margin: 0 0 0 5px;
        }
      `}</style>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}