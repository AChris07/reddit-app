import React from "react";
import {
  PostListContainer,
  PostElementContainer,
  PostElementHeader,
  PostElementBody,
  PostElementFooter,
  PostAuthor,
  PostEntryDate,
  PostTitle,
  PostCommentNumber,
} from "./Posts.style";
import Loader from "../../common/Loader";
import IconButton from "../../common/IconButton";
import UnreadIcon from "../../common/UnreadIcon";
import { PostStatusEnum, Post } from "../../types/posts";
import dates from "../../utils/dates";

export type Props = {
  status: PostStatusEnum;
  posts: Post[];
};

export type ElementProps = {
  data: Post;
};

function PostElement({ data }: ElementProps) {
  return (
    <PostElementContainer key={data.id}>
      <PostElementHeader>
        <UnreadIcon />
        <PostAuthor>{data.author}</PostAuthor>
        <PostEntryDate>{dates.getRelativeDate(data.entryDate)}</PostEntryDate>
      </PostElementHeader>
      <PostElementBody>
        <img src={data.thumbnail} alt="" />
        <PostTitle>{data.title}</PostTitle>
      </PostElementBody>
      <PostElementFooter>
        <IconButton icon="fa-times-circle" text="Dismiss Post" />
        <PostCommentNumber>{data.numComments} comments</PostCommentNumber>
      </PostElementFooter>
    </PostElementContainer>
  );
}

function PostList({ status, posts }: Props) {
  const PostListElements = posts.length ? (
    posts.map((post) => <PostElement data={post} />)
  ) : (
    <PostElementContainer key="empty-message">
      <h3>No posts available</h3>
    </PostElementContainer>
  );

  return (
    <PostListContainer>
      {status === PostStatusEnum.LOADING ? <Loader /> : PostListElements}
    </PostListContainer>
  );
}

export default PostList;
