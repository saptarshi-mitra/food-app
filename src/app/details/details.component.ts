import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../common/services/food.service';
import { TrendingComponent } from '../home/trending/trending.component';
import { map,filter } from 'rxjs/operators'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id: number;
  recipe: any;
  healthScore: number;
  ingredients=[];
  nutrition=[];
  @Input() imgUrl=[];
  wineText: string;
  @Input() link: string;
  instructions: string;
  @Input() image: string;
  @Input() limit=[];
  @Input() includeMore=[];

  show: boolean = false;
  showText: string ="Show Complete Breakdown of Nutritional Information";
  
  constructor(private data:FoodService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route)
    this.id = +this.route.snapshot.paramMap.get('id');
    this.data.getData(this.id).subscribe(response =>{
      this.recipe= response;
      console.log(this.recipe);
      this.image = response[0].image;
      this.wineText = this.recipe[0].winePairing.pairingText;
      console.log(this.wineText);
      this.ingredients = this.recipe[0].extendedIngredients;
      this.ingredients.forEach(item =>{
        this.imgUrl.push("https://spoonacular.com/cdn/ingredients_100x100/"+item.image);
      })
      this.instructions = response[0].instructions;
      this.nutrition = response[0].nutrition.nutrients.slice(0,4);
      this.limit = response[0].nutrition.nutrients.slice(0,8);
      this.includeMore = response[0].nutrition.nutrients.slice(8);
      this.healthScore = response[0].healthScore;
      this.link = this.recipe[0].winePairing.productMatches[0].link;
    })
  }

  showLimit(){
    this.show = !this.show;
    this.show ? this.showText="Hide" : this.showText="Show Complete Breakdown of Nutritional Information";
  }
}
