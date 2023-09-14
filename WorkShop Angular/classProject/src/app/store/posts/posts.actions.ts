import { Timestamp } from '@angular/fire/firestore';
import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/interfaces/post.interface';

export const FETCH_POSTS = '[Posts] Fetch Posts';
export const FETCH_POSTS_SUCCESS = '[Posts] Fetch Posts Success';

export const CREATE_POST = '[Posts] Create Post';
export const CREATE_POST_SUCCESS = '[Posts] Create Post Success';

export const DELETE_POST = '[Posts] Delete Post';
export const DELETE_POST_SUCCESS = '[Posts] Delete Post Success';

export const NAVIGATE_EDIT = '[Posts] Navigate Post';
export const NAVIGATE_EDIT_SUCCESS = '[Posts] Navigate Post Success';

export const EDIT_POST = '[Posts] Edit Post';
export const EDIT_POST_SUCCESS = '[Posts] Edit Post Success';
export const EDIT_POST_FAILURE = '[Posts] Edit Post Failure';

export const fetchPosts = createAction(FETCH_POSTS);
export const fetchPostsSuccess = createAction(
  FETCH_POSTS_SUCCESS,
  props<{ posts: Post[] }>()
);

export const createPost = createAction(
  CREATE_POST,
  props<{
    title: string;
    author: string;
    content: string;
    likes: number;
  }>()
);

export const createPostSuccess = createAction(CREATE_POST_SUCCESS);

export const editPost = createAction(
  EDIT_POST,
  props<{
    id: string;
    title: string;
    content: string;
  }>()
);

export const editPostSuccess = createAction(EDIT_POST_SUCCESS);
export const editPostFailure = createAction(
  EDIT_POST_FAILURE,
  props<{ error: any }>()
);
export const createPostFailure = createAction(
  '[Posts] Create Post Failure',
  props<{ error: any }>()
);
export const deletePost = createAction(DELETE_POST, props<{ id: string }>());
export const deletePostSuccess = createAction(DELETE_POST_SUCCESS);

export const navigatePost = createAction(
  NAVIGATE_EDIT,
  props<{ id: string }>()
);
export const NavigatePostSuccess = createAction(NAVIGATE_EDIT_SUCCESS);
