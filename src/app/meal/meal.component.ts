import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FireService } from '../common/services/fire.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  constructor(private authService: AuthService, private fire: FireService) { }

  recipes;

  ngOnInit(): void {
    this.authService.user.subscribe(currentUser => {
      this.fire.getMeal(currentUser.id, currentUser.token).subscribe(response => {
        if (response) {
          this.recipes = Object.values(response);
          console.log(this.recipes)
        }
        else{
          this.recipes = null;
        }
      })
    })
  }
}
