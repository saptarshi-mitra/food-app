import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { NotesComponent } from '../notes/notes.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService,private note:NotesComponent) { }

  isAuthenticated = false;
  private userSub: Subscription;
  userName = null;


  ngOnInit(): void {
    this.userName = "";
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if (!!user) {
        this.authService.getDetails(user.id, user.token).subscribe(username => {
          this.userName = username.userName;
          // console.log(username);
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