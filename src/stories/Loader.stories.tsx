import React from "react";
import { Story, Meta } from "@storybook/react";

import Loader from "../common/Loader";

export default {
  title: "Common/Loader",
  component: Loader,
} as Meta;

const Template: Story = (args) => <Loader {...args} />;

export const Visible = Template.bind({});
Visible.args = {
  isVisible: true,
};

export const NotVisible = Template.bind({});
NotVisible.args = {
  isVisible: false,
};
