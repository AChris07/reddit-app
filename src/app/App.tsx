import React, { useEffect } from "react";
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
  selectPosts,
  selectPostStatus,
  selectPostSelected,
} from "../features/posts/postsSlice";

function App() {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectPostStatus);
  const selected = useAppSelector(selectPostSelected);

  useEffect(() => {
    dispatch(fetchTopPosts());
  }, []);

  return (
    <AppContainer>
      <AppHeader>
        <h1>{config.appName}</h1>
      </AppHeader>
      <div className="columns">
        <AppListColumn className="column is-one-third">
          <PostList status={status} posts={posts} />
        </AppListColumn>
        <AppDetailSection className="column">
          <PostDetails post={selected} />
        </AppDetailSection>
      </div>
    </AppContainer>
  );
}

export default App;
