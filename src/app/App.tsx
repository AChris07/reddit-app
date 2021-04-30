/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect } from "react";
import { jsx, css } from "@emotion/react";
import config from "../config";
import {
  AppContainer,
  AppHeader,
  AppListColumn,
  AppDetailSection,
} from "./App.style";
import { useAppDispatch, useAppSelector } from "./hooks";
import PostList from "../features/posts/PostList";
import PostDetails from "../features/posts/PostDetails";
import {
  fetchTopPosts,
  fetchInitialPosts,
  selectPost,
  dismissPost,
  dismissAll,
  getPosts,
  getPostStatus,
  getPostSelected,
  getOffset,
  getNextToken,
} from "../features/posts/postsSlice";

function App() {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(getPosts);
  const status = useAppSelector(getPostStatus);
  const selected = useAppSelector(getPostSelected);
  const offset = useAppSelector(getOffset);
  const nextToken = useAppSelector(getNextToken);

  useEffect(() => {
    dispatch(fetchInitialPosts());
  }, []);

  return (
    <AppContainer>
      <AppHeader>
        <h1>{config.appName}</h1>
      </AppHeader>
      <div
        className="columns is-desktop"
        css={css`
          flex-direction: row-reverse;
          margin-top: 0;
        `}
      >
        <AppDetailSection className="column">
          <PostDetails post={selected} />
        </AppDetailSection>
        <AppListColumn className="column is-one-third">
          <PostList
            status={status}
            posts={posts}
            onSelect={(id: string) => dispatch(selectPost(id))}
            onPaginate={() => dispatch(fetchTopPosts({ offset, nextToken }))}
            onDismiss={(id: string) => dispatch(dismissPost(id))}
            onDismissAll={() => dispatch(dismissAll())}
          />
        </AppListColumn>
      </div>
    </AppContainer>
  );
}

export default App;
