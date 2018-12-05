import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { config } from '../../app/app-config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class UserProvider {

  constructor(private http: HttpClient) { }

  register(user): Observable<any> {
    return this.http.post(config.USER_URL + '/register', user).pipe(
      map((res: any) => console.log(res)));
  }

}
