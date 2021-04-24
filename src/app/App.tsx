import React from "react";
import config from "../config";
import {
  AppContainer,
  AppHeader,
  AppListColumn,
  AppDetailSection,
} from "./App.style";
import ListPost from "../features/posts/ListPost";
import DetailPost from "../features/posts/DetailPost";

import "bulma/css/bulma.css";

function App() {
  return (
    <AppContainer>
      <AppHeader>
        <h1>{config.appName}</h1>
      </AppHeader>
      <div className="columns">
        <AppListColumn className="column is-one-third">
          <ListPost />
          <ListPost />
        </AppListColumn>
        <AppDetailSection className="column">
          <DetailPost />
        </AppDetailSection>
      </div>
    </AppContainer>
  );
}

export default App;
