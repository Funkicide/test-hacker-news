import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from './store';
import routes from '../routes';
import api from '../api';
import type { PostItem } from './postSlice';

type PostsState = {
  ids: number[];
  entities: PostItem[];
  loading: 'idle' | 'pending' | 'succeded';
};
const initialState: PostsState = { ids: [], entities: [], loading: 'idle' };

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const postIds = await api.get(routes.dataPath());
  const slicedPostIds = postIds.slice(0, 10);
  const posts = await Promise.all(
    slicedPostIds.map(async (itemId: number) => {
      const item = api.get(routes.itemPath(itemId));

      return item;
    })
  );
  return { slicedPostIds, posts };
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        const sortedPayload = [...payload.posts].sort(
          (a, b) => b.time - a.time
        );
        state.ids = payload.slicedPostIds;
        state.entities = sortedPayload;
        state.loading = 'succeded';
      });
  },
});

export const postsSelectors = {
  selectAll: (state: RootState) => state.posts.entities,
  selectLoadingStatus: (state: RootState) => state.posts.loading,
};

export default postsSlice.reducer;
