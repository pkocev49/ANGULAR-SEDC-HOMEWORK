import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import {
  collection,
  addDoc,
  Timestamp,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { Post } from '../interfaces/post.interface';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private readonly firestore: Firestore) {}
  getPost = () => {
    const postCollection = collection(this.firestore, 'posts');
    const postCollectionData = collectionData(postCollection, {
      idField: 'id',
    }) as Observable<Post[]>;
    return postCollectionData;
  };

  createPost = (
    author: string,
    title: string,
    content: string,
    likes: number
  ) => {
    const postToBeCreated = {
      author: author,
      title: title,
      content: content,
      likes: likes,
      timestamp: Timestamp.fromDate(new Date()),
    };
    const postCollection = collection(this.firestore, 'posts');
    return from(addDoc(postCollection, postToBeCreated));
  };
  removePost = (id: string) => {
    const docRef = doc(this.firestore, `posts/${id}`);
    return from(deleteDoc(docRef));
  };
  updateLikes = (id: string, newLikes: number) => {
    const docRef = doc(this.firestore, `posts/${id}`);
    return from(updateDoc(docRef, { likes: newLikes }));
  };
}
