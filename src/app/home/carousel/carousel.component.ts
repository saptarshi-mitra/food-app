import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/common/services/food.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  
  trivia1: string;
  trivia2: string;
  joke1: string;

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.foodService.getRandomTrivia().subscribe((response: {text: string}) => this.trivia1 = response.text)

    this.foodService.getRandomTrivia().subscribe((response: {text: string}) => this.trivia2 = response.text)

    this.foodService.getRandomJoke().subscribe((response: {text: string}) => this.joke1 = response.text)
  }
  
}
