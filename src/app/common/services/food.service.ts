import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodService {


  private _apikey = '3b29c5052f9d4e76b262a81071255ec7' //saptarshi key
  url = "https://api.spoonacular.com/recipes/informationBulk?ids=";

  constructor(private _http: HttpClient) { }

  getSearchResult(query){
    return this._http.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&addRecipeNutrition=true&number=2&apiKey=${this._apikey}`)
  }

  getSuggestions(query){
    return this._http.get(`https://api.spoonacular.com/food/menuItems/suggest?query=${query}&number=5&apiKey=${this._apikey}`)
  }

  key_sumon = "51bcd51d265942b083eff5936d4e2ddb";

  getRandomTrivia(){
    return this._http.get<any>(`https://api.spoonacular.com/food/trivia/random?apiKey=${this._apikey}`);
  }

  getRandomJoke(){
    return this._http.get<any>(`https://api.spoonacular.com/food/jokes/random?apiKey=${this._apikey}`);
  }

  getRandomRecipe(count){
    return this._http.get<any>(` https://api.spoonacular.com/recipes/random?number=${count}&apiKey=${this._apikey}`)
  }

  apiKey="25afd5eaa4f846c1a19e7f8a627a5751";
  api="772ea3f410aa4c8ea2fcf9f44746bbae";

  getData(id){
    return this._http.get(`${this.url}${id}&apiKey=${this.api}&includeNutrition=true`);
  }
  getIngredientAlternate(value){
    return this._http.get(`https://api.spoonacular.com/food/ingredients/substitutes?ingredientName=${value}&apiKey=${this.api}`);
  }
  getRecipeCard(value: any){
    return this._http.post(`https://api.spoonacular.com/recipes/visualizeRecipe&apiKey=${this.api}`,{title:'value["title"]',image:'value["img"]',ingredients:'value["ingredient"]',instructions:'value["instruction"]',readyInMinutes:'value["readyInMinutes"]',servings:'value["servings"]',mask:'value["mask"]',backgroundImage:'value["backgroundImage"]'});
  }
}

