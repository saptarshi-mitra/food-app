import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/sigup/signup.component';
import { AboutComponent } from './about/about.component';
import { DetailsComponent } from './details/details.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { UserMealsComponent } from './user-meals/user-meals.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { MealComponent } from './meal/meal.component';
import { MealParentComponent } from './meal-parent/meal-parent.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search/:name',
    component: SearchResultComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'details/:id/:oid',
    component: DetailsComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'favourite',
    component: FavouriteComponent
  },
  {
    path: 'meal',
    component: MealParentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
