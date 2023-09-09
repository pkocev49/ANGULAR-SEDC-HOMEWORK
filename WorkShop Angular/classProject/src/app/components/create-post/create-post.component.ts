import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/interfaces/post.interface';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  successMessage: string = '';
  constructor(
    private readonly postService: PostsService,
    private readonly router: Router
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
    const { author, title, content, likes } = this.createPostForm.value;
    this.postService.createPost(author, title, content, likes);
    this.createPostForm.reset();
    this.successMessage = 'Post created successfully!';
  };
  onClickBack() {
    this.router.navigate(['/posts']);
  }
}
