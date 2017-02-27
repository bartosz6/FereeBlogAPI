import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer, RouterStoreModule } from '@ngrx/router-store';
import { RouterModule, Routes } from '@angular/router';

import { postListReducer } from './posts/post-list/postlist.reducer';
import { postDetailsReducer } from './posts/post-details/postdetails.reducer'

import { AppComponent } from './app.component';
import { PostListItemComponent } from './posts/post-list-item/postlistitem.component';
import { PostListComponent } from './posts/post-list/postlist.component';
import { PostDetailsComponent } from './posts/post-details/postdetails.component';
import { PostContentComponent } from './posts/post-content/postcontent.component';

import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './posts/effects/posts.effects';

import { AppConsts } from './app.consts';
import { QueryHelper } from './common/helpers/query.helper';

const appRoutes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'post', component: PostDetailsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent, PostListComponent, PostListItemComponent, PostDetailsComponent, PostContentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.provideStore({
      router: routerReducer,
      postList: postListReducer,
      postDetails: postDetailsReducer
    }),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 50
    }),
    EffectsModule.run(PostsEffects)
  ],
  providers: [QueryHelper, AppConsts],
  bootstrap: [AppComponent]
})
export class AppModule { }
