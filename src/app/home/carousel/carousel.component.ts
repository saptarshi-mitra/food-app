import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/common/services/food.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  
  trivia1;
  trivia2;
  joke1;

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.foodService.getRandomTrivia().subscribe(response=>{
      this.trivia1 = response.text;
      // console.log(response)
    })
    this.foodService.getRandomTrivia().subscribe(response=>{
      this.trivia2 = response.text;
    })
    this.foodService.getRandomJoke().subscribe(response=>{
      this.joke1 = response.text;
    })
  }



}
