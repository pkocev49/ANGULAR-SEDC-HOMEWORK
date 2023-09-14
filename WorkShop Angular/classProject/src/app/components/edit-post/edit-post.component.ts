import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PostsService } from 'src/app/services/posts.service';
import { AppState } from 'src/app/store/app.state';
import { createPost, editPost } from 'src/app/store/posts/posts.actions';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  successMessage: string = '';

  constructor(
    private readonly postService: PostsService,
    private readonly router: Router,
    private readonly store: Store<AppState>,
    private readonly route: ActivatedRoute
  ) {}
  editPostForm: FormGroup;

  ngOnInit(): void {
    // throw new Error('Method not implemented.');

    this.initForm();
  }

  initForm = () => {
    this.editPostForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
  };

  onEdit = () => {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      const { title, content } = this.editPostForm.value;
      this.store.dispatch(
        editPost({
          id: postId,
          title: title,
          content: content,
        })
      );
      this.editPostForm.reset();
      this.successMessage = 'Post edited successfully';
    } else {
      console.error('Post ID not found in the route');
    }
  };
  onClickBack() {
    this.router.navigate(['/posts']);
  }
}
