import React from "react";
import { Provider } from "react-redux";
import store from "../app/store";
import { Story, Meta } from "@storybook/react";

import App from "../app/App";

export default {
  title: "App",
  component: App,
} as Meta;

const Template: Story = (args) => (
  <Provider store={store}>
    <App />
  </Provider>
);

export const Default = Template.bind({});
