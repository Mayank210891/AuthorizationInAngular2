
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject, Subject } from 'rxjs';
import { tap } from "rxjs/internal/operators/tap";
import { User } from "./auth/user.model";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  user = new BehaviorSubject<User>(null);
  isLogin = new BehaviorSubject<boolean>(null);
  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthenticationData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBaxIHI9QYwMpLdmB0zsCDIV00sElEL7KI',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(errResp => {
        let errorMessage = 'An unknown error occurred!';
        if (!errResp.error || !errResp.error.error) {
          return throwError(errorMessage);
        }
        switch (errResp.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email already existes';

        }
        return throwError(errorMessage);
      }),
      tap(resData => {
        console.log(resData);
        const userExpiration = new Date(new Date().getTime() + +resData.expiresIn);
        const user = new User(resData.email, resData.localId, resData.idToken, userExpiration);
        this.user.next(user);

        localStorage.setItem('user', JSON.stringify(user));
      })
      )
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthenticationData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBaxIHI9QYwMpLdmB0zsCDIV00sElEL7KI',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(errResp => {
        let errorMessage = 'An unknown error occurred!';
        if (!errResp.error || !errResp.error.error) {
          return throwError(errorMessage);
        }
        switch (errResp.error.error.message) {
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'No such email exists!!';
            break;

          case 'INVALID_PASSWORD':
            errorMessage = 'Password is invalid!';
            break;

          case 'USER_DISABLED':
            errorMessage = 'User is disabled!';
            break;

        }
        return throwError(errorMessage);
      }),
      tap(resData => {
        const userExpiration = new Date(new Date().getTime() + +resData.expiresIn);
        const user = new User(resData.email, resData.localId, resData.idToken, userExpiration);
        this.user.next(user);

        localStorage.setItem('user', JSON.stringify(user));
      }))
  }

  logOut(){
    this.user.next(null);
    this.router.navigate(['\auth']);
    localStorage.removeItem('user');
  }

  autoLogin(){
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpiration: string
    } = JSON.parse(localStorage.getItem('user'));

    if (!userData){
      return
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpiration));

    if(loadedUser.token){
      this.user.next(loadedUser);
    }
  }

}

interface AuthenticationData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
