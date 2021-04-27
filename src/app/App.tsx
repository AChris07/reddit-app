import React from "react";
import config from "../config";
import {
  AppContainer,
  AppHeader,
  AppListColumn,
  AppDetailSection,
} from "./App.style";
import PostList from "../features/posts/PostList";
import PostDetails from "../features/posts/PostDetails";

function App() {
  return (
    <AppContainer>
      <AppHeader>
        <h1>{config.appName}</h1>
      </AppHeader>
      <div className="columns">
        <AppListColumn className="column is-one-third">
          <PostList />
        </AppListColumn>
        <AppDetailSection className="column">
          <PostDetails />
        </AppDetailSection>
      </div>
    </AppContainer>
  );
}

export default App;
