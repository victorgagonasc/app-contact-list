import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from "moment";
import { config } from '../../app/app-config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthProvider {

  constructor(private http: HttpClient) { }

  login(user): Observable<any> {
    return this.http.post(config.USER_URL + '/authenticate', user).pipe(
        map((res: any) => this.setSession(res.data))
    );
  }

    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');

        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

}
