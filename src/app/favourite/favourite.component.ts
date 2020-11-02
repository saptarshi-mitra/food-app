import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  constructor(private userInfo: AuthService,private http:HttpClient) { }

  user;
  id:number;
  title:string;
  userDetails;
  isLogged: boolean;
  arr;

  ngOnInit(): void {
    this.userInfo.user.subscribe(response =>{
      this.user = response
    })
    this.user === null ? this.isLogged = false : this.isLogged = true;
    if(this.isLogged){
      this.http.get(`https://food-app-385cd.firebaseio.com/users/${this.user.id}/favourites.json?auth=${this.user._token}`).subscribe(response =>{
        this.userDetails = response;
        this.arr = Object.entries(response)
        console.log(this.userDetails)
      })
    }
    else{
      console.log("take your time")
    }

  }

}
