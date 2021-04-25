import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../types/posts";
import getTopPosts from "../../api/reddit";

export interface PostsState {
  status: "idle" | "loading" | "failed";
  list: Post[];
  selected: Post | null;
}

const initialState: PostsState = {
  status: "idle",
  list: [],
  selected: null,
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
        state.status = "loading";
      })
      .addCase(
        fetchTopPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.status = "idle";
          state.list = action.payload;
        }
      )
      .addCase(fetchTopPosts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default postsSlice.reducer;
