import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from 'src/app/services/posts.service';
import * as PostsActions from './posts.actions';
import { switchMap, map, catchError, of, tap } from 'rxjs';
import { Post } from 'src/app/interfaces/post.interface';
import { Router } from '@angular/router';
@Injectable()
export class PostsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly postsService: PostsService,
    private readonly router: Router
  ) {}

  fetchPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.FETCH_POSTS),
      switchMap(() =>
        this.postsService.getPost().pipe(
          map((data) => {
            console.log(data);

            const posts: Post[] = data.map((postsDocument) => {
              return {
                id: postsDocument.id,
                title: postsDocument.title,
                content: postsDocument.content,
                author: postsDocument.author,
                timestamp: postsDocument.timestamp,
                likes: postsDocument.likes,
              };
            });
            return PostsActions.fetchPostsSuccess({ posts: posts });
          })
        )
      )
    )
  );

  $createPost = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.CREATE_POST),
      switchMap(({ title, author, content, likes }) =>
        this.postsService.createPost(title, author, content, likes).pipe(
          map(() => PostsActions.createPostSuccess()),
          catchError((error) => of(PostsActions.createPostFailure({ error })))
        )
      )
    )
  );

  $editPost = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.EDIT_POST),
      switchMap(({ id, title, content }) =>
        this.postsService.editPost(id, title, content).pipe(
          map(() => PostsActions.editPostSuccess()),
          catchError((error) => of(PostsActions.editPostFailure({ error })))
        )
      )
    )
  );
  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.DELETE_POST),
      switchMap(({ id }) =>
        this.postsService.removePost(id).pipe(
          map(() => PostsActions.deletePostSuccess()),
          catchError((error) => of(PostsActions.createPostFailure({ error })))
        )
      )
    )
  );

  onNavigatePost$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostsActions.NAVIGATE_EDIT),
        tap(({ id }) => {
          // Navigate to the edit page when NAVIGATE_EDIT action is dispatched
          this.router.navigate(['edit-post', id]); // Adjust the route path as needed
        })
      ),
    { dispatch: false } // This effect doesn't dispatch new actions
  );
}
