import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  isAuthenticated = false;
  userName:string;


  ngOnInit(): void {
    this.userName = "";
    this.authService.user.subscribe(user => {
      if (!!user) {
        this.authService.getDetails(user.id, user.token).subscribe(username => {
          this.userName = username.userName;
          this.isAuthenticated = true;
        })
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }

}
