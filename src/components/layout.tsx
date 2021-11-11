import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/layout.module.scss'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'orionmiz'
export const siteTitle = `Orionmiz's blog`

export default function Layout({ children, home, prevPostId, nextPostId }: {
  children: React.ReactNode,
  home?: boolean,
  prevPostId?: string
  nextPostId?: string
}) {
  return (
    <div className={home ? styles.narrowContainer : styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Orionmiz's blog"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.jpg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      <footer>
      {!home && (
        <div className={styles.backToHome}>
          {prevPostId ? (
          <Link href={`/posts/${prevPostId}`}>
            <a>← Go to Prev Post</a>
          </Link>) : <div/>}
          <Link href="/">
            <a>Back to home</a>
          </Link>
          {nextPostId ? (
          <Link href={`/posts/${nextPostId}`}>
            <a>Go to Next Post →</a>
          </Link>) : <div/>}
        </div>
      )}
      </footer>
    </div>
  )
}