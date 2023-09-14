import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/interfaces/post.interface';
import { PostsService } from 'src/app/services/posts.service';
import { AppState } from 'src/app/store/app.state';
import {
  deletePost,
  fetchPosts,
  navigatePost,
} from 'src/app/store/posts/posts.actions';
import { selectPosts } from 'src/app/store/posts/posts.selectors';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor(
    private readonly postService: PostsService,
    private readonly store: Store<AppState>
  ) {}
  posts: Post[] = [];
  ngOnInit(): void {
    this.store.dispatch(fetchPosts());
    this.store.select(selectPosts).subscribe((postsFromStore) => {
      this.posts = postsFromStore;
    });
  }
  onDeletePost(id: string) {
    this.store.dispatch(deletePost({ id: id }));
  }
  onEditButtonClick(postId: string) {
    this.store.dispatch(navigatePost({ id: postId }));
  }
  onLikePost(event: Event, id: string) {
    event.preventDefault();

    // Find the index of the post to update
    const postIndex = this.posts.findIndex((p) => p.id === id);

    if (postIndex !== -1) {
      const post = this.posts[postIndex];
      const newLikes = post.likes + 1;

      // Create a new array with the updated post
      const updatedPosts = [...this.posts];
      updatedPosts[postIndex] = { ...post, likes: newLikes };

      // Update the local posts array
      this.posts = updatedPosts;

      // Update the likes count on the server
      this.postService.updateLikes(id, newLikes).subscribe(() => {
        // Optional: Handle success or error response from the server here
      });
    }
  }
}
