import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from "./auth.service";
import { exhaustMap, take } from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

authService: AuthService;
  constructor(private injector: Injector){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.authService = this.injector.get(AuthService);
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if(!user){
          return next.handle(req);
        }
        console.log(user);
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        })
        return next.handle(modifiedReq);
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
