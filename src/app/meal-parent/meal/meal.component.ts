import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FireService } from 'src/app/common/services/fire.service';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {


  constructor(private authService: AuthService, private fire: FireService, private mealService: MealService) { }

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

    this.mealService.deleted.subscribe(response => {
      if(response==="reload")
        this.ngOnInit();
    })

  }


}
