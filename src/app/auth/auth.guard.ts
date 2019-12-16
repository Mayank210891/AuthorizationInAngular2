import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";
import { map, tap } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        
        return this.authService.user.pipe(
            map(user => {
                return !!user;
            }),
            tap(isAuth =>{
                if(!isAuth){
                    this.router.navigate(['\auth']);
                }
            })
        )
    }
    constructor(private authService: AuthService, private router: Router) { }

}