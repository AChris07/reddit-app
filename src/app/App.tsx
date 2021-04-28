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
  selectPost,
  getPosts,
  getPostStatus,
  getPostSelected,
} from "../features/posts/postsSlice";

function App() {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(getPosts);
  const status = useAppSelector(getPostStatus);
  const selected = useAppSelector(getPostSelected);

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
          <PostList
            status={status}
            posts={posts}
            onSelect={(id) => dispatch(selectPost(id))}
          />
        </AppListColumn>
        <AppDetailSection className="column">
          <PostDetails post={selected} />
        </AppDetailSection>
      </div>
    </AppContainer>
  );
}

export default App;
