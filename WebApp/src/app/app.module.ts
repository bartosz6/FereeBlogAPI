import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer, RouterStoreModule  } from '@ngrx/router-store';
import { RouterModule, Routes } from '@angular/router';

import { postListReducer } from './posts/post-list/postlist.reducer';

import { AppComponent } from './app.component';
import { PostListItemComponent } from './posts/post-list-item/postlistitem.component';
import { PostListComponent } from './posts/post-list/postlist.component';

const appRoutes: Routes = [
  { path: 'blog', component: PostListComponent },
  { path: '**', redirectTo: 'blog', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent, PostListComponent, PostListItemComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.provideStore({ router: routerReducer, postList: postListReducer }),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 50
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
