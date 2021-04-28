import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostStatusEnum, Post } from "../../types/posts";
import getTopPosts from "../../api/reddit";
import { RootState } from "../../app/store";

export interface PostsState {
  status: PostStatusEnum;
  entities: Record<string, Post>;
  ids: string[];
  selectedId?: string;
}

interface FetchPostsPayload {
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
  async (): Promise<FetchPostsPayload> => {
    const response = await getTopPosts();

    const payload: FetchPostsPayload = { entities: {}, ids: [] };
    return response.reduce(
      (acc, { data }) => ({
        entities: {
          ...acc.entities,
          [data.id]: {
            id: data.id,
            title: data.title,
            thumbnail: data.thumbnail,
            author: data.author,
            entryDate: data.created_utc,
            numComments: data.num_comments,
            isRead: false,
          },
        },
        ids: [...acc.ids, data.id],
      }),
      payload
    );
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
          state.entities = action.payload.entities;
          state.ids = action.payload.ids;
        }
      )
      .addCase(fetchTopPosts.rejected, (state) => {
        state.status = PostStatusEnum.FAILED;
      });
  },
});

export const { selectPost } = postsSlice.actions;

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

export default postsSlice.reducer;
