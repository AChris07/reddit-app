import { mocked } from "ts-jest/utils";
import getTopPosts from "../../api/reddit";
import { RootState } from "../../app/store";
import { PostStatusEnum } from "../../types/posts";
import postsReducer, {
  FetchPostsPayload,
  selectPost,
  dismissPost,
  dismissAll,
  fetchTopPosts,
  fetchInitialPosts,
  getPostStatus,
  getPosts,
  getPostSelected,
  getOffset,
  getNextToken,
} from "./postsSlice";
import { mockPosts, mockState } from "../../tests/mocks/posts";

jest.mock("../../api/reddit", () => jest.fn(async () => mockPosts));

describe("Posts slice", () => {
  it("should handle initial state", () => {
    expect(postsReducer(undefined, { type: "unknown" })).toEqual({
      status: PostStatusEnum.IDLE,
      offset: 0,
      entities: {},
      ids: [],
      selectedId: undefined,
    });
  });

  describe("reducers", () => {
    it("should correctly select a post", () => {
      const newState = postsReducer(mockState, selectPost("post1"));
      const { selectedId, entities } = newState;
      expect(selectedId).toEqual("post1");
      expect(entities[selectedId].isRead).toBe(true);
    });

    it("should correctly dismiss a post", () => {
      const newState = postsReducer(mockState, dismissPost("post1"));
      expect(newState.ids).toEqual(["post2"]);
    });

    it("should correctly dismiss all posts", () => {
      const newState = postsReducer(mockState, dismissAll());
      expect(newState.ids).toEqual([]);
    });
  });

  describe("extraReducers", () => {
    describe("fetchTopPosts", () => {
      const mockPayload = {
        after: "mock-after",
        entities: {
          post3: {
            id: "post3",
            title: "Post 3",
            thumbnail: "http://mock.thumbnail.com",
            author: "Mock Author 3",
            entryDate: 1609459200,
            numComments: 3000,
            isRead: false,
          },
        },
        ids: ["post3"],
      };

      it("should handle pending state", () => {
        const newState = postsReducer(mockState, fetchTopPosts.pending);
        expect(newState.status).toEqual(PostStatusEnum.LOADING);
      });

      it("should handle fulfilled state", () => {
        const newState = postsReducer(
          mockState,
          fetchTopPosts.fulfilled(mockPayload, "mock-request-id", {
            offset: 0,
          })
        );
        expect(newState.status).toEqual(PostStatusEnum.IDLE);
        expect(newState.entities.post3).not.toBeUndefined();
        expect(newState.ids.length).toBe(3);
        expect(newState.ids.includes("post3")).toBe(true);
      });

      it("should handle rejected state", () => {
        const newState = postsReducer(
          mockState,
          fetchTopPosts.rejected(
            {
              name: "mock-error",
              message: "Mock Error",
            },
            "mock-request-id",
            {
              offset: 0,
            }
          )
        );
        expect(newState.status).toEqual(PostStatusEnum.FAILED);
        expect(newState.entities.post3).toBeUndefined();
        expect(newState.ids.length).toBe(2);
      });
    });
  });

  describe("async thunks", () => {
    describe("fetchTopPosts", () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => mockState);

      it("successfully fetches top posts", async () => {
        const actionCreator = fetchTopPosts({ offset: 0 });
        // TODO: Determine generics application to infer payload type on async thunks
        const result = await actionCreator(dispatch, getState, undefined);
        const payload = result.payload as FetchPostsPayload;

        expect(result.type).toEqual("posts/fetchTop/fulfilled");
        expect(Object.keys(payload.entities).length).toBe(2);
        expect(payload.ids.length).toBe(2);
      });

      it("manages failed fetching", async () => {
        const mockError = new Error("Mock error");
        mocked(getTopPosts).mockRejectedValueOnce(mockError);
        const actionCreator = fetchTopPosts({ offset: 0 });
        // TODO: Determine generics application to infer payload type on async thunks
        const result: any = await actionCreator(dispatch, getState, undefined);

        expect(result.type).toEqual("posts/fetchTop/rejected");
        expect(result.error.name).toEqual("Error");
        expect(result.error.message).toEqual("Mock error");
      });
    });
  });

  describe("fetchInitialPosts", () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => mockState);

    it("successfully resets all posts and fetches them again", async () => {
      fetchInitialPosts()(dispatch, getState, undefined);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch.mock.calls[0][0]).toEqual(dismissAll());
    });
  });

  describe("selectors", () => {
    const rootState: RootState = {
      posts: mockState,
    };
    it("returns post status", () => {
      expect(getPostStatus(rootState)).toEqual(PostStatusEnum.IDLE);
    });

    it("returns post list", () => {
      expect(getPosts(rootState)).toEqual([
        {
          id: "post1",
          title: "Post 1",
          thumbnail: "http://mock.thumbnail.com",
          author: "Mock Author 1",
          entryDate: 1609459200,
          numComments: 1000,
          isRead: false,
        },
        {
          id: "post2",
          title: "Post 2",
          thumbnail: "http://mock.thumbnail.com",
          author: "Mock Author 2",
          entryDate: 1609459200,
          numComments: 2000,
          isRead: false,
        },
      ]);
    });

    it("returns post selected", () => {
      expect(getPostSelected(rootState)).toEqual({
        id: "post1",
        title: "Post 1",
        thumbnail: "http://mock.thumbnail.com",
        author: "Mock Author 1",
        entryDate: 1609459200,
        numComments: 1000,
        isRead: false,
      });
    });

    it("returns pagination offset", () => {
      expect(getOffset(rootState)).toEqual(2);
    });

    it("returns pagination next token", () => {
      expect(getNextToken(rootState)).toEqual("mock-next-token");
    });
  });
});
