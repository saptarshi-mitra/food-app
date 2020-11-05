import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(private http: HttpClient) { }

  getFavorites(userId: string, token: string){
    return this.http.get(`https://food-app-385cd.firebaseio.com/users/${userId}/favourites.json?auth=${token}`)
  }

  getMeal(userId: string, token: string){
    return this.http.get(`https://food-app-385cd.firebaseio.com/users/${userId}/meal.json?auth=${token}`)
  }

  deleteFavorite(userId:string, id: string, token: string){
    return this.http.delete(`https://food-app-385cd.firebaseio.com/users/${userId}/favourites/${id}.json?auth=${token}`)
  }

  deleteMeal(userId:string, id: string, token: string){
    return this.http.delete(`https://food-app-385cd.firebaseio.com/users/${userId}/meal/${id}.json?auth=${token}`)
  }
}
