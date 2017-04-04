import { Http, Response, Request } from '@angular/http';
import { IAuthService } from './IAuthService';
import { URLSearchParams, QueryEncoder, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AppConsts } from '../../app.consts';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        private http: Http,
        private appConsts: AppConsts
    ) { }

    login(query: any): Observable<any> {

        let result = this.http.post(this.appConsts.API_URL+'auth/login', {
            email: query.login,
            password: query.password
        });

        return result.map(response => response.json());
    }
}

