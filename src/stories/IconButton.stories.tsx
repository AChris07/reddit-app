import React from "react";
import { Story, Meta } from "@storybook/react";

import IconButton, { Props } from "../common/IconButton";

export default {
  title: "Common/IconButton",
  component: IconButton,
} as Meta;

const Template: Story<Props> = (args) => <IconButton {...args} />;

export const Icon = Template.bind({});
Icon.args = {
  icon: "fa-times-circle",
  text: "Mock Text",
};

export const IconWithText = Template.bind({});
IconWithText.args = {
  icon: "fa-home",
};

export const JustText = Template.bind({});
JustText.args = {
  text: "Mock Text",
};
