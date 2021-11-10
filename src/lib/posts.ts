import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import hljs from 'highlight.js';

interface Metadata {
  title: string,
  date: string,
  tags?: string[]
}

export interface PostData extends Metadata {
  id: string,
}

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string, tags: string[] })
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // markdown-it way
  const md = require('markdown-it')({
    highlight: function (str: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
            '</code></pre>';
        } catch (__) { }
      }

      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
  });
  const contentHtml = md.render(matterResult.content);

  //const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as Metadata)
  }
}

export function getAllTags() {
  const fileNames = fs.readdirSync(postsDirectory)

  const tags = new Set<string>();

  fileNames.forEach(fileName => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents).data as Metadata

    matterResult.tags?.forEach((tag: string) => {
      tags.add(tag)
    });
  });

  return Array.from(tags).map(tag => ({ params: { tag }}));
}

export function getSortedPostsDataByTag(tag: string) {
  return getSortedPostsData().filter(post => post.tags?.includes(tag));
}

export function getLinkedPostsId(id: string): {
  prev?: string,
  next?: string
} {
  const regex = /\-[0-9]+$/;
  const matches = id.match(regex);

  // check whether id ends with number or not
  if (matches) {
    const postName = id.replace(regex, '');
    const order = parseInt(matches[0].slice(1));

    const prev = order <= 1 ? undefined : `${postName}-${order - 1}`;
    const next = `${postName}-${order + 1}`;

    return { prev, next };
  }
  return {};
}

export function isExistingPost(id: string) {
  if (!id)
    return false;

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.includes(`${id}.md`);
}