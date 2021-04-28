import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostStatusEnum, Post } from "../../types/posts";
import getTopPosts from "../../api/reddit";
import { RootState } from "../../app/store";

export interface PostsState {
  status: PostStatusEnum;
  list: Post[];
  selected?: Post;
}

const initialState: PostsState = {
  status: PostStatusEnum.IDLE,
  list: [],
  selected: undefined,
};

export const fetchTopPosts = createAsyncThunk(
  "posts/fetchTop",
  async (): Promise<Post[]> => {
    const response = await getTopPosts();
    return response.map(({ data }) => ({
      id: data.id,
      title: data.title,
      thumbnail: data.thumbnail,
      author: data.author,
      entryDate: data.created_utc,
      numComments: data.num_comments,
      isRead: false,
    }));
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopPosts.pending, (state) => {
        state.status = PostStatusEnum.LOADING;
      })
      .addCase(
        fetchTopPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.status = PostStatusEnum.IDLE;
          state.list = action.payload;
        }
      )
      .addCase(fetchTopPosts.rejected, (state) => {
        state.status = PostStatusEnum.FAILED;
      });
  },
});

export const selectPostStatus = (state: RootState) => state.posts.status;
export const selectPosts = (state: RootState) => state.posts.list;
export const selectPostSelected = (state: RootState) => state.posts.selected;

export default postsSlice.reducer;
