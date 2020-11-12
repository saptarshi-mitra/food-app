import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-meal-parent',
  templateUrl: './meal-parent.component.html',
  styleUrls: ['./meal-parent.component.css']
})
export class MealParentComponent implements OnInit {

  private userSub: Subscription;
  constructor(private authService: AuthService) { }
  userName="";

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
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

}
