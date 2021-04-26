import React from "react";
import { Story, Meta } from "@storybook/react";

import UnreadIcon from "../common/UnreadIcon";

export default {
  title: "Common/UnreadIcon",
  component: UnreadIcon,
} as Meta;

const Template: Story = (args) => <UnreadIcon {...args} />;

export const Default = Template.bind({});
