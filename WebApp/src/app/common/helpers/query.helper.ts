import { Injectable } from '@angular/core';
import { AppConsts } from '../../app.consts';
import { URLSearchParams, QueryEncoder } from '@angular/http';

@Injectable()
export class QueryHelper {
   
    constructor(
        private _appConsts: AppConsts
    ) {}

    getApiBaseUrl() {
        return this._appConsts.API_URL;
    }

    getQueryParams(request: any) : URLSearchParams {
        let params: URLSearchParams = new URLSearchParams();

        

        return params;
    }
}