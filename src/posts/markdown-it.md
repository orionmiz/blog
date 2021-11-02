---
title: 'Markdown-it with Syntax Highlighting'
date: '2021-11-01'
tags: ['web', 'css', 'markdown']
---

Hello! I'm testing a new markdown parser [**`markdown-it`**](https://github.com/markdown-it/markdown-it)

It supports syntax highlighting with [**`highlight.js`**](https://github.com/highlightjs/highlight.js/)

I'll show you two examples of the same code block.

**No styles:**
```
const postsDirectory = path.join(process.cwd(), 'posts')

// make & bring unique posts id
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
```

**🎨 Styled with highlight.js:**
```js
const postsDirectory = path.join(process.cwd(), 'posts')

// make & bring unique posts id
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
```

> This is the result of applying the **androidstudio** styles to the codes.

😎 Isn't it better to read than the first one? 

## Let's get started!

First of all, Install those modules via npm or yarn:

```
npm install markdown-it highlight.js
# or
yarn add markdown-it highlight.js
```

and parse markdown:

```ts
import hljs from 'highlight.js';

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
const contentHtml = md.render(markdown); // buffer or string from a markdown file
```

Lastly, import the styles to apply in the component using parsed markdown content.
```js
import 'highlight.js/styles/androidstudio.css'
```
highlight.js supports various styles and you can just pick favorite one from the `highlight.js/styles/~~` directory.

