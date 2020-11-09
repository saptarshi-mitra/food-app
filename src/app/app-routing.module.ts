import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/sigup/signup.component';
import { AboutComponent } from './about/about.component';
import { DetailsComponent } from './details/details.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { MealParentComponent } from './meal-parent/meal-parent.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordChangeComponent } from './profile/password-change/password-change.component';

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
    component: FavouriteComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'meal',
    component: MealParentComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'account',
    component: ProfileComponent,
    children: [
      {path: 'passwordChange', component: PasswordChangeComponent}
    ],
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
