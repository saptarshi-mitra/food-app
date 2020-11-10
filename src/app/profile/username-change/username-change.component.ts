import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

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
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(res => {
      this.id = res.id
      this.token = res.token
    })
  }

  changeToNewUsername(){
    this.authService.registerDetails(this.username, this.id, this.token).subscribe(res => this.hasChanged = true, error => this.error = error)
  }

  ngOnDestroy(){
    this.userSub.unsubscribe()
  }

}
