import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-username-change',
  templateUrl: './username-change.component.html',
  styleUrls: ['./username-change.component.css']
})
export class UsernameChangeComponent implements OnInit, OnDestroy {

  id: string = ``
  token: string = ``
  username: string = ``
  hasChanged: boolean
  userSub: Subscription
  error
  user: User
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(res => {
      this.id = res.id
      this.token = res.token
      this.user = res;
    })
  }

  changeToNewUsername() {
    this.authService.updateDetails(this.username, this.id, this.token).subscribe(res => {
      this.hasChanged = true;
      this.authService.user.next(this.user);
    }, error => this.error = error);

  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

}
