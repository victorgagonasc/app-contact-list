import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { config } from '../../app/app-config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserProvider } from '../user/user';

@Injectable()
export class ContactProvider {

  constructor(private http: HttpClient, private userApi: UserProvider ) { }

  create(data): Observable<any> {
    data.userId = this.userApi.getUser().id;
    return this.http.post(config.CONTACT_URL, data).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      }));
  }

  getAll(): Observable<any> {
    return this.http.get(config.CONTACT_URL).pipe(
      map((res: any) => {
        res.data.contacts = res.data.contacts.filter(contact => { return contact.userId === this.userApi.getUser().id });
        return res;
      }));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
