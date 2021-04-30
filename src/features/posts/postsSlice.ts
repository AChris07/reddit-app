import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { PostStatusEnum, Post } from "../../types/posts";
import getTopPosts from "../../api/reddit";
import { AppThunk, RootState } from "../../app/store";

export interface PostsState {
  status: PostStatusEnum;
  nextToken?: string;
  entities: Record<string, Post>;
  ids: string[];
  selectedId?: string;
}

interface FetchPostsRequest {
  offset: number;
  nextToken?: string;
}

interface FetchPostsPayload {
  after: string;
  entities: Record<string, Post>;
  ids: string[];
}

const initialState: PostsState = {
  status: PostStatusEnum.IDLE,
  entities: {},
  ids: [],
  selectedId: undefined,
};

export const fetchTopPosts = createAsyncThunk(
  "posts/fetchTop",
  async ({
    offset = 0,
    nextToken,
  }: FetchPostsRequest): Promise<FetchPostsPayload> => {
    const response = await getTopPosts(offset, nextToken);

    const payload: FetchPostsPayload = {
      after: response.after,
      entities: {},
      ids: [],
    };
    return response.children.reduce((acc, { data }) => {
      const uuid = nanoid();
      return {
        ...acc,
        entities: {
          ...acc.entities,
          [uuid]: {
            id: uuid,
            title: data.title,
            thumbnail: data.thumbnail,
            author: data.author,
            entryDate: data.created_utc,
            numComments: data.num_comments,
            isRead: false,
          },
        },
        ids: [...acc.ids, uuid],
      };
    }, payload);
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<string | undefined>) => {
      state.selectedId = action.payload;
      if (action.payload !== undefined) {
        state.entities[action.payload].isRead = true;
      }
    },
    dismissPost: (state, action: PayloadAction<string>) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
    dismissAll: (state) => {
      state.nextToken = undefined;
      state.ids = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopPosts.pending, (state) => {
        state.status = PostStatusEnum.LOADING;
      })
      .addCase(
        fetchTopPosts.fulfilled,
        (state, action: PayloadAction<FetchPostsPayload>) => {
          state.status = PostStatusEnum.IDLE;
          state.nextToken = action.payload.after;
          state.entities = {
            ...state.entities,
            ...action.payload.entities,
          };
          state.ids = [...state.ids, ...action.payload.ids];
        }
      )
      .addCase(fetchTopPosts.rejected, (state) => {
        state.status = PostStatusEnum.FAILED;
      });
  },
});

export const { selectPost, dismissPost, dismissAll } = postsSlice.actions;

export const fetchInitialPosts = (): AppThunk => (dispatch) => {
  dispatch(dismissAll());
  dispatch(fetchTopPosts({ offset: 0 }));
};

export const getPostStatus = (state: RootState) => state.posts.status;
export const getPosts = (state: RootState) => {
  const { ids, entities } = state.posts;
  return ids.map((id) => entities[id]);
};
export const getPostSelected = (state: RootState) => {
  const { selectedId, entities } = state.posts;
  if (selectedId === undefined) return undefined;
  return entities[selectedId];
};
export const getOffset = (state: RootState) => {
  const { ids } = state.posts;
  return ids.length;
};
export const getNextToken = (state: RootState) => {
  const { nextToken } = state.posts;
  return nextToken;
};

export default postsSlice.reducer;
