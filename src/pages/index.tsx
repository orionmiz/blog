import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'
import Github from '../components/github'
import Badge from '../components/badge'

export default function Home({
  allPostsData
}: {
  allPostsData: {
    date: string
    title: string
    id: string
    tags: string[]
  }[]
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
        <a href='https://github.com/orionmiz'>
          <div className='channel'>
            <Github/>
            <div>Github</div>
          </div>
        </a>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Posts</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, tags }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              {tags?.map((tag, idx) => (<Badge color='white' key={idx}>{tag}</Badge>))}
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <style jsx>{`
        p {
          text-align: center;
        }
        .channel {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
        .channel > * {
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