import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { FireService } from 'src/app/common/services/fire.service';
import { MealService } from '../../meal.service';

@Component({
  selector: 'app-meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.css']
})
export class MealItemComponent implements OnInit {

  @Input() recipe: any;

  constructor(private fire: FireService, private auth: AuthService, private router: Router, private mealService: MealService) { }

  beingDeleted = false;

  ngOnInit(): void {
    console.log(this.recipe);
  }

  onDelete() {
    this.beingDeleted = true;
    this.auth.user.subscribe(user => {

      this.fire.deleteMeal(user.id, this.recipe.id, user.token).subscribe(resopnse => {
        console.log(resopnse);
        this.mealService.deleted.next("reload");
      })
    })
  }

}
