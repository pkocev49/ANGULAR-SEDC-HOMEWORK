import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/interfaces/post.interface';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { createPost } from 'src/app/store/posts/posts.actions';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  successMessage: string = '';
  constructor(
    private readonly postService: PostsService,
    private readonly router: Router,
    private readonly store: Store<AppState>
  ) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');

    this.initForm();
  }
  createPostForm: FormGroup;
  initForm = () => {
    this.createPostForm = new FormGroup({
      author: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      likes: new FormControl(0),
    });
  };

  onSubmit = () => {
    const { title, author, content, likes } = this.createPostForm.value;
    this.store.dispatch(
      createPost({
        title: title,
        author: author,

        content: content,
        likes: likes,
      })
    );
    this.createPostForm.reset();
    this.successMessage = 'Post created successfully';
  };

  onClickBack() {
    this.router.navigate(['/posts']);
  }
}
