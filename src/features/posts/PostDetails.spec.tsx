import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import PostDetails from "./PostDetails";
import { mockStatePosts } from "../../tests/mocks/posts";

describe("PostDetails component", () => {
  let wrapper: ShallowWrapper<typeof PostDetails>;

  it("successfully renders with no post selected", () => {
    wrapper = shallow(<PostDetails post={undefined} />);

    expect(wrapper.exists()).toBe(true);
  });

  it("successfully renders with a post selected", () => {
    wrapper = shallow(<PostDetails post={mockStatePosts[0]} />);

    expect(wrapper.exists()).toBe(true);
  });
});
