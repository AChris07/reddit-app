import React from "react";
import {
  PostDetailsContainer,
  PostDetailsAuthor,
  PostTitle,
} from "./Posts.style";
import { Post } from "../../types/posts";

export type Props = {
  post?: Post;
};

function PostDetails({ post }: Props) {
  return (
    <PostDetailsContainer>
      {post ? (
        <>
          <PostDetailsAuthor>{post.author}</PostDetailsAuthor>
          <img src={post.thumbnail} alt="" />
          <PostTitle>{post.title}</PostTitle>
        </>
      ) : (
        <h3>Please select a post</h3>
      )}
    </PostDetailsContainer>
  );
}

export default PostDetails;
