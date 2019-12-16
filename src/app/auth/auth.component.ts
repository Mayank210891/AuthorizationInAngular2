import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public isLoginEnabled = false;
  public error: string;
  constructor(private authService: AuthService,
  private router: Router) { }

  ngOnInit() {
    //this.isLoginEnabled = this.authService.isLogin.value;
    this.authService.isLogin.subscribe(res =>{
      this.isLoginEnabled = res;
    })
  }

  enableLogin() {
    this.isLoginEnabled = !this.isLoginEnabled;
  }
  onSubmit(form: NgForm) {
    if(form.invalid){
      return;
    }
    if (this.isLoginEnabled) {
      this.authService.signIn(form.value.email, form.value.password)
      .subscribe(
        res => {
          this.router.navigate(['/user']);
        },
        err => {
          this.error = err;
        }
      )
    } else {
      this.authService.signUp(form.value.email, form.value.password)
        .subscribe(
        res => {
          this.router.navigate(['/user']);
        },
        err => {
          this.error = err;
        }
        );

        form.reset();
    }

  }

}
