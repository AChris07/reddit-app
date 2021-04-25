import React from "react";
import { Post } from "../../types/posts";

type Props = {
  posts: Post[];
};

type ElementProps = {
  data: Post;
};

function PostListElement({ data }: ElementProps) {
  return (
    <li key={data.id}>
      <div>
        <h2>{data.title}</h2>
        <h3>{data.entryDate}</h3>
        <img src={data.thumbnail} alt="" />
        <span>{data.numComments} comments</span>
        <button type="button">Dismiss Post</button>
      </div>
    </li>
  );
}

function PostList({ posts }: Props) {
  return (
    <ul>
      {posts.map((post) => (
        <PostListElement data={post} />
      ))}
    </ul>
  );
}

export default PostList;
