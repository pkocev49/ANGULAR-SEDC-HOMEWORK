import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post.interface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor(private readonly postService: PostsService) {}
  posts: Post[] = [];
  ngOnInit(): void {
    this.postService.getPost().subscribe((posts) => {
      this.posts = posts;
    });
  }
  onDeletePost(id: string) {
    this.postService.removePost(id);
  }
  onLikePost(event: Event, id: string) {
    event.preventDefault();
    const post = this.posts.find((p) => p.id === id);

    if (post) {
      const newLikes = post.likes + 1;
      this.postService.updateLikes(id, newLikes).subscribe(() => {
        // Update the local post with the new likes count
        post.likes = newLikes;
      });
    }
  }
}
