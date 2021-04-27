import React from "react";
import { Story, Meta } from "@storybook/react";

import PostDetails, { Props } from "../features/posts/PostDetails";
import { Post, PostStatusEnum } from "../types/posts";

export default {
  title: "Components/DetailsPost",
  component: PostDetails,
} as Meta;

const mockPost: Post = {
  id: `mock-id`,
  title: `Mock Post`,
  thumbnail: "https://picsum.photos/200",
  author: `Mock Author`,
  entryDate: 1619382797,
  numComments: 1337,
  isRead: false,
};

const Template: Story<Props> = (args) => <PostDetails {...args} />;

export const WithoutSelection = Template.bind({});
WithoutSelection.args = {
  post: undefined,
};

export const SelectedPost = Template.bind({});
SelectedPost.args = {
  post: mockPost,
};
