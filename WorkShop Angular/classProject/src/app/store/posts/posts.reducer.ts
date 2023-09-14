import { createReducer, on } from '@ngrx/store';
import { Post } from 'src/app/interfaces/post.interface';
import * as PostsActions from './posts.actions';

export interface PostsState {
  posts: Post[];
}
export const initialState: PostsState = {
  posts: [],
};

export const reducer = createReducer(
  initialState,
  on(PostsActions.fetchPostsSuccess, (state, payload) => {
    return {
      ...state,
      posts: payload.posts,
    };
  }),

  on(PostsActions.createPost, (state) => {
    return {
      ...state,
    };
  }),
  on(PostsActions.createPostSuccess, (state) => {
    return {
      ...state,
    };
  }),
  on(PostsActions.editPost, (state, { id, title, content }) => {
    return {
      ...state,
      posts: state.posts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            title: title,
            content: content,
          };
        }
        return post;
      }),
    };
  }),
  on(PostsActions.editPostSuccess, (state) => {
    return {
      ...state,
    };
  })
);
