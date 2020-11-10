import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FireService } from '../common/services/fire.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  constructor(private authService: AuthService, private fire: FireService) { }

  recipes;
  isLoading = true;

  ngOnInit(): void {
    this.authService.user.subscribe(currentUser => {
      this.fire.getFavorites(currentUser.id, currentUser.token).subscribe(response => {
        if (response) {
          this.recipes = Object.values(response);
          // console.log(this.recipes)
        }
        else{
          this.recipes = null;
        }
        this.isLoading = false;
      })
    })
  }

}
