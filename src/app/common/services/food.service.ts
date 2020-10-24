import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodService {


  private _apikey = '3b29c5052f9d4e76b262a81071255ec7' //saptarshi key
  constructor(private _http: HttpClient) { }

  getSearchResult(query){
    return this._http.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&addRecipeNutrition=true&number=10&apiKey=${this._apikey}`)
  }


  key_sumon = "51bcd51d265942b083eff5936d4e2ddb";


  getRandomRecipe(count){
    return this._http.get<any>(` https://api.spoonacular.com/recipes/random?number=${count}&apiKey=${this.key_sumon}`)
  }

}

