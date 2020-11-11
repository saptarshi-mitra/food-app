import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../common/services/food.service';
import { FormBuilder } from '@angular/forms';
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
  form;
  id: number;
  username: string;
  comment: string;
  recipeArray = [];
  recipeReviewComment = [];
  recipeReviewUser = [];
  recipeReview = [];
  @Input() favColor;
  toggleMeal: boolean;
  isTester: boolean = true;
  conditonal: boolean;
  isLogged: boolean = false;
  commentBool: boolean;
  user:User;
  recipe: any;
  favourite = [];
  healthScore: number;
  ingredients = [];
  nutrition = [];
  substitute: any;
  @Input() imgUrl = [];
  wineText: string;
  @Input() link: string;
  instructions: string;
  @Input() image: string;
  @Input() limit = [];
  @Input() includeMore = [];
  show: boolean = false;
  showCardBool: boolean = false;
  view: boolean = false;
  switch: boolean = false;
  showText: string = "Show Complete Breakdown of Nutritional Information";
  buttonText: string = "Click to see in Metrics";

  constructor(
    private foodService: FoodService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private http: HttpClient,
    private fb: FormBuilder,
    private fire: FireService) {
    this.form = fb.group({
      comment: ['']
    })
  }

  ngOnInit(): void {

    this.id = +this.route.snapshot.paramMap.get('id');

    //fetching recipe details
    this.foodService.getData(this.id).subscribe(response => {
      this.recipe = response;
      // console.log(this.recipe);
      this.image = response[0].image;
      this.wineText = this.recipe[0].winePairing.pairingText;
      this.ingredients = this.recipe[0].extendedIngredients;
      this.ingredients.forEach(item => {
        this.imgUrl.push("https://spoonacular.com/cdn/ingredients_100x100/" + item.image);
      })
      this.instructions = response[0].instructions;
      this.nutrition = response[0].nutrition.nutrients.slice(0, 4);
      this.limit = response[0].nutrition.nutrients.slice(0, 8);
      this.includeMore = response[0].nutrition.nutrients.slice(8);
      this.healthScore = response[0].healthScore;

      if (this.recipe[0].winePairing.hasOwnProperty('productMatches')) {
        this.link = this.recipe[0].winePairing.productMatches[0].link;
      }

      //user logged in check
      this.authService.user.subscribe(response => {
        this.isLoaded = true;
        if (!!response) {
          this.user = response
          this.isLogged = true;

          //get reviews
          this.fire.getReviews(this.recipe[0].id).subscribe(response => {
            if (!!response) {
              this.recipeReviewComment = Object.values(response);
              this.recipeReviewComment.forEach(item => {
                this.recipeReview.push(item.review)
                this.recipeReviewUser.push(item.user)
              })
            }
          })

          //check if in favourite
          this.fire.getFavoriteRecipe(response.id, response.token, this.recipe[0].id).subscribe(res => {
            if (!!res) {
              this.favColor = "btn-danger";
              this.isTester = false;
            }
          })

          //check if in meal
          this.fire.getMealRecipe(response.id, response.token, this.recipe[0].id).subscribe(res => {
            if (!!res) {
              this.toggleMeal = true;
            }
          })
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
    if (this.isTester) {
      this.favColor = "btn-danger";
      this.http.patch(`https://food-app-385cd.firebaseio.com/users/${this.user.id}/favourites.json?auth=${this.user.token}`,
        {
          [this.recipe[0].id]: this.recipe[0]
        }).subscribe(response => {
          // console.log(response)
        })
    }
    else {
      this.favColor = "";
      this.http.delete(`https://food-app-385cd.firebaseio.com/users/${this.user.id}/favourites/${this.recipe[0].id}.json?auth=${this.user.token}`).subscribe(response => {
        // console.log(response);
      })
    }
    this.isTester = !this.isTester;
  }

  addToMeal() {
    if (!(this.toggleMeal)) {
      this.http.patch(`https://food-app-385cd.firebaseio.com/users/${this.user.id}/meal.json?auth=${this.user.token}`, {
        [this.recipe[0].id]: this.recipe[0]
      }).subscribe(response => {
        // console.log(response)
      })
    }
    else {
      // this.favColor = "btn-succes";
      this.http.delete(`https://food-app-385cd.firebaseio.com/users/${this.user.id}/meal/${this.recipe[0].id}.json?auth=${this.user.token}`).subscribe(response => {
        // console.log(response);
      })
    }
  }

  addReview() {
    this.commentBool = !this.commentBool;
  }

  addComment(value) {
    this.authService.getDetails(this.user.id, this.user.token).subscribe(response => {
      this.username = response.userName;
      this.http.post(`https://foodapp-a7482.firebaseio.com//reviews/${this.recipe[0].id}.json`, {
        "review": this.comment,
        "user": this.username
      }).subscribe(response => {
        // console.log(response)
      })
    })
    this.comment = value;
    this.form.reset()
  }
}
