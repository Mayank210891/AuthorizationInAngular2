import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from "./auth.service";
import { take, exhaustMap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable()
export class FetchService {

  constructor(private _http: HttpClient, private _auth: AuthService) { }

  fetchData() {
    return this._http.get('https://mera-hisaab-11644.firebaseio.com/posts.json')
      .pipe(
      catchError(err => {
        return throwError(err);
      })
      )
  }

  // fetchData() {
  //   return this._auth.user.pipe(
  //     take(1),
  //     exhaustMap(user => {
  //       return this._http.get('https://mera-hisaab-11644.firebaseio.com/posts.json',{
  //         params: new HttpParams().set('auth', user._token)
  //       })
  //     }),
  //     catchError(err => {
  //       return throwError(err);
  //     })
  //   )
  // }


}

