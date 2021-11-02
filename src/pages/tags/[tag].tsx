import Layout from '../../components/layout'
import { getAllTags, getSortedPostsDataByTag } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import 'highlight.js/styles/androidstudio.css'
import Badge from '../../components/badge'
import Link from 'next/link'

export default function Tag({
  relatedPostsData,
  tag
}: {
  relatedPostsData: {
    date: string
    title: string
    id: string
    tags: string[]
  }[],
  tag: string
}) {
  return (
    <Layout>
      <Head>
        <title>{`All posts related to '${tag}'`}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Posts related to {`'${tag}'`}</h2>
        <ul className={utilStyles.list}>
          {relatedPostsData.map(({ id, date, title, tags }) => (
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