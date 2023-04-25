import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import postReducer from './postSlice';
import commentsReducer from './commentsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    post: postReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
