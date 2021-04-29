import React from "react";
import { Story, Meta } from "@storybook/react";

import PostList, { Props } from "../features/posts/PostList";
import { Post, PostStatusEnum } from "../types/posts";

export default {
  title: "Components/PostList",
  component: PostList,
  argTypes: {
    onSelect: { action: "clicked" },
    onDismiss: { action: "clicked" },
    onDismissAll: { action: "clicked" },
  },
} as Meta;

const generateMockPosts = (amount: number, isRead = false): Post[] =>
  Array.from(
    { length: amount },
    (x, i): Post => ({
      id: `mock-id-${i + 1}`,
      title: `Mock Post ${i + 1}`,
      thumbnail: "https://picsum.photos/200",
      author: `Mock Author ${i + 1}`,
      entryDate: 1619382797,
      numComments: (i + 1) * 100,
      isRead,
    })
  );

const Template: Story<Props> = (args) => <PostList {...args} />;

export const LoadingState = Template.bind({});
LoadingState.args = {
  status: PostStatusEnum.LOADING,
  posts: [],
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  status: PostStatusEnum.IDLE,
  posts: [],
};

export const LoadedState = Template.bind({});
LoadedState.args = {
  status: PostStatusEnum.IDLE,
  posts: generateMockPosts(3),
};

export const ReadPostState = Template.bind({});
ReadPostState.args = {
  status: PostStatusEnum.IDLE,
  posts: [...generateMockPosts(1, true), ...generateMockPosts(2)],
};
