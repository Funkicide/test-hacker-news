import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from './store';
import routes from '../routes';
import api from '../api';

export type PostItem =
  | {
      id: number;
      deleted?: true;
      type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt';
      by?: string;
      time: number;
      text?: HTMLElement;
      dead?: true;
      parent?: number;
      poll?: number;
      kids?: number[];
      url?: string;
      score?: number;
      title?: string;
      parts?: number[];
      descendants?: number;
    }
  | Record<string, never>;

interface PostState {
  post: PostItem;
  loading: 'idle' | 'pending' | 'succeded';
}
const initialState: PostState = { post: {}, loading: 'idle' };

export const fetchPost = createAsyncThunk(
  'post/fetchPost',
  async (id: number): Promise<PostItem> => {
    const post = await api.get(routes.itemPath(id));

    return post;
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: (state, { payload }) => {
      state.post = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchPost.fulfilled, (state, { payload }) => {
        // @ts-ignore: Don't know the correct type
        state.post = payload;
        state.loading = 'succeded';
      });
  },
});

export const { addPost } = postSlice.actions;

export const postSelectors = {
  selectPost: (state: RootState) => state.post.post,
  selectKids: (state: RootState) => state.post.post.kids,
  selectLoadingStatus: (state: RootState) => state.post.loading,
};

export default postSlice.reducer;
