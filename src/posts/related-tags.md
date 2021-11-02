---
title: 'Adding related tags to the blog posts'
date: '2021-11-02'
tags: ['web', 'ssg']
---

> **Notice!** This post extends [**The Next.js Tutorial**](https://nextjs.org/learn/basics/create-nextjs-app)

Hello! I felt the necessity of sorting blog posts by topics while developing my blog.

So at this time, I'm gonna show you how to add releated tags to the blog posts.

First, Let's make a simple badge component for tags.

**components/badge.tsx**

```tsx
import Link from 'next/link'

export default function Badge({ children, color } : { children: React.ReactNode, color: string }) {
  return (
  <>
    <Link href={`/tags/${children?.toString()}`}>
      <a>{children}</a>
    </Link>
    <style jsx>{`
      a {
        margin: 0 5px 0 0;
        font-size: 70%;
        line-height: 1.45;
        padding: 2px 5px;
        color: ${color};
        border-radius: 5px;
        background-color: gray;
      }
    `}</style>
  </>);
}
```

> Check these badge components on top of this post.

Also, By clicking a tag, Related posts should be shown on the separate list page.

For this feature, I made a page component using **_Dynamic Routes_**

**pages/tags/[tag].tsx**

```tsx
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
```

Here are **`getAllTags`** and **`getSortedPostsDataByTag`** functions.

**lib/posts.ts**

```ts
export function getAllTags() {
  const fileNames = fs.readdirSync(postsDirectory)

  const tags = new Set<string>();

  fileNames.forEach(fileName => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    matterResult.data?.tags?.forEach((tag: string) => {
      tags.add(tag);
    });
  });

  return Array.from(tags).map(tag => ({ params: { tag }}));
}

export function getSortedPostsDataByTag(tag: string) {
  return getSortedPostsData().filter(post => post.tags?.includes(tag)); // use existing function
}
```

To add tags to the post, Modify metadata section of the post's files (like title, date)

```
---
title: 'Adding related tags to the blog posts'
date: '2021-11-02'
tags: ['web', 'ssg']
---
```

Now, we can access url like `/tags/{tagname}` to find posts which have a specific tag!

