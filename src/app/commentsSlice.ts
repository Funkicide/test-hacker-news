import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from './store';
import routes from '../routes';
import api from '../api';

export type CommentItem =
  | {
      [key: string]: any;
      id: number;
      deleted?: true;
      type: 'comment';
      by: string;
      time: number;
      text: string;
      dead?: true;
      parent: number;
      kids?: number[];
      children?: CommentItem[];
    }
  | Record<string, never>;

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (ids: number[] | undefined) => {
    if (ids === undefined) {
      return null;
    }

    const comments = await Promise.all(
      ids.map(async (id) => {
        const comment: Promise<CommentItem> = api.get(routes.itemPath(id));
        return comment;
      })
    );

    return { ids, comments };
  }
);

export const fetchNestedComments = createAsyncThunk(
  'comments/fetchNestedComments',
  async function fetch(
    commentsIds: number[] | undefined
  ): Promise<CommentItem[]> {
    const promises = (commentsIds || []).map(async (commentId) => {
      const comment = await api.get(routes.itemPath(commentId));

      if (!comment.kids) {
        return comment;
      }

      const kids = await fetch(comment.kids);

      return [comment, ...kids];
    });

    const children: CommentItem[] = await Promise.all(promises);
    return children.flat(Infinity);
  }
);

interface CommentsState {
  ids: number[];
  entities:
    | {
        [key: string]: CommentItem;
      }
    | Record<string, never>;
  expandedId: number | null;
  loading: 'idle' | 'pending' | 'succeded';
}
const initialState: CommentsState = {
  ids: [],
  entities: {},
  expandedId: null,
  loading: 'idle',
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setExpanded: (state, { payload }) => {
      state.expandedId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchComments.fulfilled, (state, { payload }) => {
        state.ids = payload?.ids ?? [];
        const commentsMap = payload?.comments.reduce((acc, comment) => {
          acc[comment.id.toString()] = comment;

          return acc;
        }, {});
        // @ts-ignore: Don't know the correct type
        state.entities = commentsMap;
        state.loading = 'succeded';
      })
      .addCase(fetchNestedComments.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchNestedComments.fulfilled, (state, { payload }) => {
        const nestedComments = payload.reduce((acc, comment) => {
          const parent = payload.find((item) => item.id === comment.parent);
          if (parent) {
            acc[parent.id] = parent;
            (acc[parent.id].children = acc[parent.id].children || []).push(
              comment
            );
            return acc;
          }
          acc[comment.id] = comment;

          return acc;
        }, {});
        // @ts-ignore: Don't know the correct type
        state.entities[state.expandedId!].children = nestedComments;
        state.loading = 'succeded';
      });
  },
});

export const { setExpanded } = commentsSlice.actions;

export const commentsSelectors = {
  selectAll: (state: RootState) => state.comments.entities,
  selectLoadingStatus: (state: RootState) => state.comments.loading,
};

export default commentsSlice.reducer;
