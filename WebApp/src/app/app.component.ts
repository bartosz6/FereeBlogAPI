import { Component } from '@angular/core';
import { State, Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import { UUID } from 'angular2-uuid';
import { AppState } from './app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})



export class AppComponent {

  constructor(private _store: Store<AppState>) {
  }
}
