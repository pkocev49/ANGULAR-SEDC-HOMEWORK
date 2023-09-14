import { AppState } from '../app.state';

export const selectPosts = (state: AppState) => state.posts.posts;

// export const selectIsCreating = (state: AppState) => state.tasks.isCreating;
