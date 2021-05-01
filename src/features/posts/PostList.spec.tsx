import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { mocked } from "ts-jest/utils";
import PostList, { Props } from "./PostList";
import IconButton from "../../common/IconButton";
import { mockStatePosts } from "../../tests/mocks/posts";
import { PostStatusEnum } from "../../types/posts";

describe("PostList component", () => {
  let wrapper: ShallowWrapper<typeof PostList>;
  const props: Props = {
    status: PostStatusEnum.IDLE,
    posts: mockStatePosts,
    onSelect: jest.fn(),
    onPaginate: jest.fn(),
    onDismiss: jest.fn(),
    onDismissAll: jest.fn(),
  };

  afterEach(() => {
    mocked(props.onSelect).mockClear();
    mocked(props.onPaginate).mockClear();
    mocked(props.onDismiss).mockClear();
    mocked(props.onDismissAll).mockClear();
  });

  it("successfully renders with no posts", () => {
    const idleProps: Props = {
      ...props,
      posts: [],
    };
    wrapper = shallow(<PostList {...idleProps} />);

    expect(wrapper.exists()).toBe(true);
  });

  it("successfully renders while loading", () => {
    const loadingProps: Props = {
      ...props,
      status: PostStatusEnum.LOADING,
    };
    wrapper = shallow(<PostList {...loadingProps} />);

    expect(wrapper.exists()).toBe(true);
  });

  it("successfully renders with posts", () => {
    wrapper = shallow(<PostList {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it("triggers a select if a post is clicked", () => {
    wrapper = shallow(<PostList {...props} />);
    expect(props.onSelect).not.toHaveBeenCalled();
    const firstPost = wrapper.find("PostElement").first().dive();
    firstPost.simulate("click");

    expect(props.onSelect).toHaveBeenCalled();
  });

  it("triggers a dismiss if the dismiss button is clicked", () => {
    wrapper = shallow(<PostList {...props} />);
    expect(props.onDismiss).not.toHaveBeenCalled();
    const firstPost = wrapper.find("PostElement").first().dive();
    const dismissBtn = firstPost.find(IconButton);
    expect(dismissBtn.prop("text")).toBe("Dismiss Post");
    dismissBtn.simulate("click", { stopPropagation: jest.fn() });

    expect(props.onDismiss).toHaveBeenCalled();
  });

  it("triggers a dismiss all if the dismiss all button is clicked", () => {
    wrapper = shallow(<PostList {...props} />);
    expect(props.onDismissAll).not.toHaveBeenCalled();
    const dismissAllBtn = wrapper.find('[text="Dismiss All"]');
    dismissAllBtn.simulate("click");

    expect(props.onDismissAll).toHaveBeenCalled();
  });
});
