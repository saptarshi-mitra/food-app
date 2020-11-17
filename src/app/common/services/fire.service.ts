import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(private http: HttpClient) { }

  getFavorites(userId: string, token: string) {
    return this.http.get(`https://food-app-385cd.firebaseio.com/users/${userId}/favourites.json?auth=${token}`)
  }

  getMeal(userId: string, token: string) {
    return this.http.get(`https://food-app-385cd.firebaseio.com/users/${userId}/meal.json?auth=${token}`)
  }

  addFavorite(userId: string, token: string, recipe: any) {
    return this.http.patch(`https://food-app-385cd.firebaseio.com/users/${userId}/favourites.json?auth=${token}`,
      {
        [recipe.id]: recipe
      })
  }

  addMeal(userId: string, token: string, recipe: any) {
    return this.http.patch(`https://food-app-385cd.firebaseio.com/users/${userId}/meal.json?auth=${token}`,
      {
        [recipe.id]: recipe
      })
  }

  getFavoriteRecipe(userId: string, token: string, recipeId: string) {
    return this.http.get(`https://food-app-385cd.firebaseio.com/users/${userId}/favourites/${recipeId}.json?auth=${token}`)
  }

  getMealRecipe(userId: string, token: string, recipeId: string) {
    return this.http.get(`https://food-app-385cd.firebaseio.com/users/${userId}/meal/${recipeId}.json?auth=${token}`)
  }

  deleteFavorite(userId: string, id: string, token: string) {
    return this.http.delete(`https://food-app-385cd.firebaseio.com/users/${userId}/favourites/${id}.json?auth=${token}`)
  }

  deleteMeal(userId: string, id: string, token: string) {
    return this.http.delete(`https://food-app-385cd.firebaseio.com/users/${userId}/meal/${id}.json?auth=${token}`)
  }

  getReviews(recipeId: string) {
    return this.http.get(`https://foodapp-a7482.firebaseio.com/reviews/${recipeId}.json`)
  }

  addReview(id:string, comment: string, user: string) {
    return this.http.post(`https://foodapp-a7482.firebaseio.com/reviews/${id}.json`, {
      "review": comment,
      "user": user,
      "timeStamp": new Date()
    })
  }

}
