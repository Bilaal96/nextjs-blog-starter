// Metadata represented as YAML Front Matter in markdown file
export interface MarkdownPostMetadata {
  title: string;
  date: string;
}

export interface PostMetadata extends MarkdownPostMetadata {
  id: string;
}

export interface PostData extends PostMetadata {
  content: string;
}

// object of params for a single dynamically generated route
export interface DynamicPath<T extends {}> {
  params: T;
}

// Expected path/route params for a single post
type PostIdParam = string;
interface PostPathParams {
  [index: string]: string;
  id: PostIdParam;
}

// Context object (in [id].js) returned by getStaticPaths; received by getStaticProps
// Example Object: { params: { id: "my-first-post" } }
export type PathToPost = DynamicPath<PostPathParams>;
