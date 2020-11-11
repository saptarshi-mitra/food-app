import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/common/services/food.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {

  isLoaded = false;
  trending;
  tempImage = "https://static.vecteezy.com/system/resources/previews/000/463/565/non_2x/healthy-food-clipart-vector.jpg";
  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.foodService.getRandomRecipe(8).subscribe(data => {
      this.trending = data.recipes;
      this.isLoaded = true;
      console.log(data.recipes)
    }
    );
  }

}
