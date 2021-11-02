import { PostData } from '../lib/posts'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from './date'
import Badge from './badge'

export default function PostList({ postsData, tag }: { postsData: PostData[], tag?: string }) {
  return (
  <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
    <h2 className={utilStyles.headingLg}>{tag ? `Posts related to '${tag}'` : 'Posts'}</h2>
    <ul className={utilStyles.list}>
      {postsData.map(({ id, date, title, tags }) => (
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
  </section>)
}