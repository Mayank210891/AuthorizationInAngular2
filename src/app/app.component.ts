import { Component, OnInit } from '@angular/core';
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.authService.autoLogin();
  }
  title = 'app';
  constructor(private authService: AuthService,
  private router: Router){}

  register() {
    this.authService.isLogin.next(false);
  }

  login() {
    this.authService.isLogin.next(true);
  }

  logoutUser() {
    this.authService.logOut();
    this.router.navigate(['\auth']);
  }
}
