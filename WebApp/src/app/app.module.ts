import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer, RouterStoreModule } from '@ngrx/router-store';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

//reducers
import { postListReducer } from './components/containers/posts/post-list/postlist.reducer';
import { postDetailsReducer } from './components/containers/posts/post-details/postdetails.reducer'
import { loginReducer } from './components/containers/user/login/login.reducer';

//containers
import { AppComponent } from './app.component';
import { PostListContainer } from './components/containers/posts/post-list/postlist.container';
import { PostDetailsComponent } from './components/containers/posts/post-details/postdetails.component';
import { LoginContainer } from './components/containers/user/login/login.container';

//childs
import { PostContentComponent } from './components/childs/posts/post-details/post-content/postcontent.component';
import { PostListComponent } from './components/childs/posts/post-list/post-list/postlist.component';
import { PostListItemComponent } from './components/childs/posts/post-list/post-list-item/postlistitem.component';
import { LoginPanelComponent } from './components/childs/user/login/login-panel/loginpanel.component';

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
  { path: 'login', component: LoginContainer },
  { path: '**', redirectTo: 'blog/', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent, PostListContainer, LoginContainer,
    
    PostListComponent, PostListItemComponent, PostDetailsComponent, PostContentComponent, LoginPanelComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.provideStore({
      router: routerReducer,
      postList: postListReducer,
      postDetails: postDetailsReducer,
      login: loginReducer
    }),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 50
    }),
    EffectsModule.run(PostsEffects),
    ReactiveFormsModule
  ],
  providers: [

    { provide: AppConsts, useClass: AppConsts },
    { provide: IPostsService, useClass: DummyPostsService }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
