import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../common/services/food.service';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { FireService } from '../common/services/fire.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  isLoaded = false;
  username: string;
  comment: string;
  recipeReview = [];
  isInMeal = false;
  isFavourite = false;
  isLogged: boolean = false;
  user: User;
  recipe: any;
  nutrition = [];
  substitute: any;
  wineText: string;
  link: string;
  limit = [];
  includeMore = [];
  show: boolean = false;
  showCardBool: boolean = false;
  view: boolean = false;
  switch: boolean = false;
  showText: string = "Show Complete Breakdown of Nutritional Information";
  buttonText: string = "Click to see in Metrics";
  ingredientsImageUrl = "https://spoonacular.com/cdn/ingredients_100x100/";

  constructor(
    private foodService: FoodService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private http: HttpClient,
    private fire: FireService) {

  }

  ngOnInit(): void {

    //fetching recipe details
    this.foodService.getRecipeData(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      this.recipe = response;
      console.log(this.recipe);
      this.nutrition = this.recipe.nutrition.nutrients.slice(0, 4);
      this.limit = this.recipe.nutrition.nutrients.slice(0, 8);
      this.includeMore = this.recipe.nutrition.nutrients.slice(8);


      if (!!this.recipe.winePairing.hasOwnProperty('productMatches')) {
        if (!!this.recipe.winePairing.productMatches[0]) {
          this.wineText = this.recipe.winePairing.pairingText;
          this.link = this.recipe.winePairing.productMatches[0].link;
        }
      }

      console.log(this.wineText)

      //get reviews
      this.fire.getReviews(this.recipe.id).subscribe(response => {
        if (!!response) {
          this.recipeReview = Object.values(response);
          // console.log(this.recipeReview)
        }
      })

      //user logged in check
      this.authService.user.subscribe(response => {
        if (!!response) {
          this.user = response
          this.isLogged = true;

          //get username
          this.authService.getDetails(this.user.id, this.user.token).subscribe(response => this.username = response.userName);

          //check if in favourite
          this.fire.getFavoriteRecipe(response.id, response.token, this.recipe.id).subscribe(res => {
            if (!!res) {
              this.isFavourite = true;
            }
          })

          //check if in meal
          this.fire.getMealRecipe(response.id, response.token, this.recipe.id).subscribe(res => {
            if (!!res) {
              this.isInMeal = true;
            }
            this.isLoaded = true;
          })
        } else {
          this.isLoaded = true;
        }
      })
    })
  }

  showLimit() {
    this.show = !this.show;
    this.show ? this.showText = "Hide" : this.showText = "Show Complete Breakdown of Nutritional Information";
  }

  alternate(value) {
    this.view = true;
    this.foodService.getIngredientAlternate(value).subscribe(response => {
      this.substitute = response;
    });
  }

  showCard() {
    this.showCardBool = !this.showCardBool;
  }

  measure() {
    this.switch = !this.switch;
    this.switch ? this.buttonText = "Hide" : this.buttonText = "Click to see in Metrics";
  }

  addFav() {
    if (!this.isFavourite) {
      this.fire.addFavorite(this.user.id, this.user.token, this.recipe).subscribe();
    }
    else {
      this.fire.deleteFavorite(this.user.id, this.recipe.id, this.user.token).subscribe();
    }
    this.isFavourite = !this.isFavourite;
  }

  addToMeal() {
    if (!this.isInMeal) {
      this.fire.addMeal(this.user.id, this.user.token, this.recipe).subscribe();
    }
    else {
      this.fire.deleteMeal(this.user.id, this.recipe.id, this.user.token).subscribe();
    }
    this.isInMeal = !this.isInMeal;
  }

  addComment() {
    this.fire.addReview(this.recipe.id, this.comment, this.username).subscribe();
    this.recipeReview.unshift({
      "review": this.comment,
      "user": this.username
    })
    this.comment = "";
  }

}