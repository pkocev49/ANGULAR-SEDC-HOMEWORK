import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { PostsComponent } from './components/posts/posts.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterLinkActive } from '@angular/router';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirestoreModule } from '@angular/fire/firestore';
import { EditPostComponent } from './components/edit-post/edit-post.component'; // Import AngularFirestoreModule
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/posts/posts.reducer';
import { reducers } from './store/app.state';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './store/posts/posts.effects';
const firebaseConfig = {
  apiKey: 'AIzaSyC3sRaRDzeLGblI0nhjGVPYb4G3MGmm1v0',
  authDomain: 'post-page-17efe.firebaseapp.com',
  projectId: 'post-page-17efe',
  storageBucket: 'post-page-17efe.appspot.com',
  messagingSenderId: '926498239535',
  appId: '1:926498239535:web:6994606dc11c13453a82da',
  measurementId: 'G-55TC7RRM5F',
};
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    PostsComponent,
    HomeComponent,
    NavigationComponent,
    CreatePostComponent,
    NotFoundComponent,
    EditPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLinkActive,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    FormsModule,
    ReactiveFormsModule,
    FirestoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([PostsEffects]),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
