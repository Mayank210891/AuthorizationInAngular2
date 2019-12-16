import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { RouterModule } from "@angular/router";
import { AuthService } from "./auth.service";
import { UserComponent } from './user/user.component';
import { FetchService } from "./fetch.service";
import { AuthInterceptorService } from "./auth-interceptor.service";
import { AuthGuard } from "./auth/auth.guard";


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'auth', component: AuthComponent
      },
      {
        path: 'user', component: UserComponent, canActivate: [AuthGuard]
      }
    ])
  ],
  providers: [AuthService, FetchService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
