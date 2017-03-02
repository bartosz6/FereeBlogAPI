import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer, RouterStoreModule } from '@ngrx/router-store';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

//reducers
import { postListReducer } from './components/containers/posts/post-list/postlist.reducer';
import { postDetailsReducer } from './components/containers/posts/post-details/postdetails.reducer'

//containers
import { AppComponent } from './app.component';
import { PostListContainer } from './components/containers/posts/post-list/postlist.container';
import { PostDetailsComponent } from './components/containers/posts/post-details/postdetails.component';

//childs
import { PostContentComponent } from './components/childs/posts/post-details/post-content/postcontent.component';
import { PostListComponent } from './components/childs/posts/post-list/post-list/postlist.component';
import { PostListItemComponent } from './components/childs/posts/post-list/post-list-item/postlistitem.component';

//effects
import { PostsEffects } from './components/containers/posts/effects/posts.effects';

//common
import { AppConsts } from './app.consts';

//services
import { PostsService } from './infrastructure/services/PostsService';
import { DummyPostsService } from './infrastructure/services/DummyPostsService';
import { IPostsService } from './infrastructure/services/IPostsService';

const appRoutes: Routes = [
  { path: 'blog/:tag', component: PostListContainer },
  { path: 'post', component: PostDetailsComponent },
  { path: '**', redirectTo: 'blog/', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent, PostListContainer,
    
    PostListComponent, PostListItemComponent, PostDetailsComponent, PostContentComponent
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
  providers: [

    { provide: AppConsts, useClass: AppConsts },
    { provide: IPostsService, useClass: DummyPostsService }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
