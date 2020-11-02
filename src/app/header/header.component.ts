import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) { }

  isAuthenticated = false;
  private userSub: Subscription;
  userName;


  ngOnInit(): void {
    this.userName = "";
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if (!!user) {
        this.authService.getDetails(user.id, user.token).subscribe(username => {
          this.userName = username.userName;
        })
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
