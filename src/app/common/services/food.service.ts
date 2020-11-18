import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  // private _apikey = '3b29c5052f9d4e76b262a81071255ec7'; //saptarshi key
  // apiKey="25afd5eaa4f846c1a19e7f8a627a5751";
  // api="772ea3f410aa4c8ea2fcf9f44746bbae";
  // key_sumon = "51bcd51d265942b083eff5936d4e2ddb";

  private _searchAndSuggestionKey = '3b29c5052f9d4e76b262a81071255ec7'; //saptarshi key
  private _randomRecipeKey="25afd5eaa4f846c1a19e7f8a627a5751";
  private _triviaAndJokeKey="772ea3f410aa4c8ea2fcf9f44746bbae";
  private _searchById = "51bcd51d265942b083eff5936d4e2ddb";
  private _ingredientAlternative = '3744dc7d521349f2a439909deec1a00c'
  
  url = "https://api.spoonacular.com/recipes/informationBulk?ids=";

  constructor(private _http: HttpClient) { }

  getSearchResult(query: string){
    return this._http.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&addRecipeNutrition=true&number=10&apiKey=${this._searchAndSuggestionKey}`)
  }

  getSuggestions(query: string){
    return this._http.get(`https://api.spoonacular.com/food/menuItems/suggest?query=${query}&number=5&apiKey=${this._searchAndSuggestionKey}`)
  }

  getRandomTrivia(){
    return this._http.get<{text: string}>(`https://api.spoonacular.com/food/trivia/random?apiKey=${this._triviaAndJokeKey}`);
  }

  getRandomJoke(){
    return this._http.get<{text: string}>(`https://api.spoonacular.com/food/jokes/random?apiKey=${this._triviaAndJokeKey}`);
  }

  getRandomRecipe(count: number){
    return this._http.get<any>(` https://api.spoonacular.com/recipes/random?number=${count}&apiKey=${this._randomRecipeKey}`)
  }

  getData(id){
    return this._http.get(`${this.url}${id}&apiKey=${this._searchById}&includeNutrition=true`);
  }

  getRecipeData(id){
    return this._http.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${this._searchById}&includeNutrition=true`);
  }


  getIngredientAlternate(value){
    return this._http.get<any>(`https://api.spoonacular.com/food/ingredients/substitutes?ingredientName=${value}&apiKey=${this._ingredientAlternative}`);
  }





  /* the below code is used only for presentation or deployment*/

  // private _doNotUseThisKey = '3744dc7d521349f2a439909deec1a00c'

  // getSearchResult(query){
  //   return this._http.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&addRecipeNutrition=true&number=10&apiKey=${this._doNotUseThisKey}`)
  // }

  // getSuggestions(query){
  //   return this._http.get(`https://api.spoonacular.com/food/menuItems/suggest?query=${query}&number=5&apiKey=${this._doNotUseThisKey}`)
  // }

  // getRandomTrivia(){
  //   return this._http.get<any>(`https://api.spoonacular.com/food/trivia/random?apiKey=${this._doNotUseThisKey}`);
  // }

  // getRandomJoke(){
  //   return this._http.get<any>(`https://api.spoonacular.com/food/jokes/random?apiKey=${this._doNotUseThisKey}`);
  // }

  // getRandomRecipe(count){
  //   return this._http.get<any>(` https://api.spoonacular.com/recipes/random?number=${count}&apiKey=${this._doNotUseThisKey}`)
  // }

  // getData(id){
  //   return this._http.get(`${this.url}${id}&apiKey=${this._doNotUseThisKey}&includeNutrition=true`);
  // }

  // getIngredientAlternate(value){
  //   return this._http.get(`https://api.spoonacular.com/food/ingredients/substitutes?ingredientName=${value}&apiKey=${this._doNotUseThisKey}`);
  // }
}

