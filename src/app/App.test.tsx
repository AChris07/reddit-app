import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { mocked } from "ts-jest/utils";
import { RootState } from "./store";
import App from "./App";
import { useAppSelector } from "./hooks";
import IconButton from "../common/IconButton";
import { initialState as mockInitialState } from "../features/posts/postsSlice";
import { mockState } from "../tests/mocks/posts";

const mockDispatch = jest.fn();
const initialStateSelector = (selector: (state: RootState) => void) =>
  selector({ posts: mockInitialState });
const stateWithPostsSelector = (selector: (state: RootState) => void) =>
  selector({ posts: mockState });
jest.mock("./hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(initialStateSelector),
}));

describe("App component", () => {
  let wrapper: ShallowWrapper<typeof App>;
  let useEffectSpy: jest.SpyInstance;

  beforeEach(() => {
    useEffectSpy = jest
      .spyOn(React, "useEffect")
      .mockImplementation((cb) => cb());
  });

  afterEach(() => {
    useEffectSpy.mockRestore();
    mockDispatch.mockClear();
    mocked(useAppSelector).mockClear();
  });

  it("successfully renders", () => {
    wrapper = shallow(<App />);

    expect(wrapper.exists()).toBe(true);
  });

  it("does not fetch posts if there was a saved state in the local storage", () => {
    mocked(useAppSelector).mockImplementation(stateWithPostsSelector);
    wrapper = shallow(<App />);

    expect(useEffectSpy).toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();

    // Restoring implementation
    mocked(useAppSelector).mockImplementation(initialStateSelector);
  });

  it("fetches initial posts if none were recovered from localStorage", () => {
    wrapper = shallow(<App />);

    expect(useEffectSpy).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("refreshes the app when the Reload button is pressed", () => {
    mocked(useAppSelector).mockImplementation(stateWithPostsSelector);
    wrapper = shallow(<App />);

    expect(mockDispatch).not.toHaveBeenCalled();
    const resetButton = wrapper.find(IconButton);
    resetButton.simulate("click");

    expect(mockDispatch).toHaveBeenCalled();

    // Restoring implementation
    mocked(useAppSelector).mockImplementation(initialStateSelector);
  });
});
