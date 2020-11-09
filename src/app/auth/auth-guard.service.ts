import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  isAuthenticated = false
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot){
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if (!!user) {
        this.authService.getDetails(user.id, user.token).subscribe(res => this.isAuthenticated = true)
      }
    });
    if(this.isAuthenticated == false){
      return this.router.navigate(['/signin'], {queryParams: {returnUrl: state.url}})
    }
    return this.isAuthenticated
  }
}
