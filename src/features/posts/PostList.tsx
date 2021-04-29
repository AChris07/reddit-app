/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  PostListContainer,
  PostElementContainer,
  PostElementHeader,
  PostElementBody,
  PostElementFooter,
  PostAuthor,
  PostEntryDate,
  PostTitle,
  PostImage,
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
  onSelect: (id: string) => void;
  onDismiss: (id: string) => void;
  onDismissAll: () => void;
};

export type ElementProps = {
  data: Post;
  onSelect: (id: string) => void;
  onDismiss: (id: string) => void;
};

function PostElement({ data, onSelect, onDismiss }: ElementProps) {
  const postImage = data.thumbnail && (
    <PostImage className="column is-one-third" src={data.thumbnail} alt="" />
  );

  return (
    <PostElementContainer onClick={() => onSelect(data.id)}>
      <PostElementHeader className="columns is-desktop">
        <div className="column is-inline-flex is-align-items-center">
          {!data.isRead && <UnreadIcon />}
          <PostAuthor>{data.author}</PostAuthor>
        </div>
        <PostEntryDate className="column">
          {dates.getRelativeDate(data.entryDate)}
        </PostEntryDate>
      </PostElementHeader>
      <PostElementBody className="columns is-desktop">
        {postImage}
        <PostTitle className="column">{data.title}</PostTitle>
      </PostElementBody>
      <PostElementFooter>
        <IconButton
          icon="fa-times-circle"
          text="Dismiss Post"
          onClick={(evt: React.MouseEvent) => {
            onDismiss(data.id);
            evt.stopPropagation();
          }}
        />
        <PostCommentNumber>{data.numComments} comments</PostCommentNumber>
      </PostElementFooter>
    </PostElementContainer>
  );
}

function PostList({ status, posts, onSelect, onDismiss, onDismissAll }: Props) {
  const PostListElements = posts.length ? (
    <React.Fragment>
      <TransitionGroup>
        {posts.map((post) => (
          <CSSTransition key={post.id} timeout={200} classNames="post">
            <CSSTransition
              in={post.isRead}
              timeout={300}
              classNames="post-read"
            >
              <PostElement
                data={post}
                onSelect={onSelect}
                onDismiss={onDismiss}
              />
            </CSSTransition>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <IconButton
        key="dismiss-all"
        className="is-fullwidth"
        css={css`
          position: sticky;
          bottom: 15px;
        `}
        onClick={onDismissAll}
        text="Dismiss All"
      />
    </React.Fragment>
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
