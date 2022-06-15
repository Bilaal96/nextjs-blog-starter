import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), '_posts');

export function getSortedPostsData() {
  // Get filenames under /posts
  const fileNames = fs.readdirSync(postsDirectory);

  // Generate array of posts (inc. metadata)
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // matter() returns { contents: '<markdown-contents>', data: { key: val } }
    // Where "data" property contains => YAML Front Matter parsed as object properties
    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });

  /**
   * Sort posts by date (most recent post first)
   * @return 1 - sort a after b  / (b comes in-front)
   * @return -1 - sort a before b / (a comes in-front)
   * @return 0 - keep original order of a and b
   */
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

// For generating dynamic routes to a single post
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  /**
   * Returns an array that looks like this:
    [
      { params: { id: 'ssg-ssr' } },
      { params: { id: 'pre-rendering' } },
    ] 
   */
  return fileNames.map((fileName) => ({
    params: { id: fileName.replace(/\.md$/, '') },
  }));
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const htmlContent = processedContent.toString();

  // Combine the data with the id
  return {
    id,
    content: htmlContent,
    ...matterResult.data,
  };
}
