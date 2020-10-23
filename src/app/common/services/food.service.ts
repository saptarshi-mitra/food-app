import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  key_sumon = "51bcd51d265942b083eff5936d4e2ddb";
  constructor(private http: HttpClient) { }

  getRandomRecipe(){
    return this.http.get<any>(` https://api.spoonacular.com/recipes/random?number=10&apiKey=${this.key_sumon}`)
  }

}
