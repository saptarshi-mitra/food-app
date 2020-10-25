import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/common/services/food.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {

  trending;
  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.foodService.getRandomRecipe(8).subscribe(data => this.trending = data.recipes);
  }

}
