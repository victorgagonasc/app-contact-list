import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthProvider } from '../../providers/auth/auth';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private auth: AuthProvider) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers;

        if (this.auth.isLoggedIn())
            headers = { 'x-access-token': this.auth.getToken() }
        else
            headers = { 'Content-Type': 'application/json' }

        request = request.clone({ setHeaders: headers });

        return next.handle(request);
    }
}