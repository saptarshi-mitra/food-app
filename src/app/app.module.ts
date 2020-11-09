import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTabsModule} from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './home/search/search.component';
import { TrendingComponent } from './home/trending/trending.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { DetailsComponent } from './details/details.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './footer/footer.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/sigup/signup.component';
import { HeaderComponent } from './header/header.component';
import { LoadingSpinnerComponent } from './common/shared/loading-spinner/loading-spinner.component';

import { AboutComponent } from "./about/about.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilterCuisinePipe } from './common/pipe/filter-cuisine.pipe';
import { FilterVegPipe } from './common/pipe/filter-veg.pipe';
import { PriceFilterPipe } from './common/pipe/price-filter.pipe';
import { FilterGlutenPipe } from './common/pipe/filter-gluten.pipe';
import { FilterDiaryProductsPipe } from './common/pipe/filter-diary-products.pipe';
import { SubscribeComponent } from './home/subscribe/subscribe.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { UserMealsComponent } from './user-meals/user-meals.component';
import { ChartsModule } from 'ng2-charts';
import { FavouriteComponent } from './favourite/favourite.component';
import { IndividualGraphsComponent } from './user-meals/individual-graphs/individual-graphs.component';
import { MealComponent } from './meal/meal.component';
import { FavItemComponent } from './favourite/fav-item/fav-item.component';
import { MealParentComponent } from './meal-parent/meal-parent.component';
import { MealItemComponent } from './meal/meal-item/meal-item.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordChangeComponent } from './profile/password-change/password-change.component';
import { UsernameChangeComponent } from './profile/username-change/username-change.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    TrendingComponent,
    SearchResultComponent,
    DetailsComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    AboutComponent,
    FilterCuisinePipe,
    FilterVegPipe,
    PriceFilterPipe,
    FilterGlutenPipe,
    FilterDiaryProductsPipe,
    SubscribeComponent,
    CarouselComponent,
    FavouriteComponent,
    MealComponent,
    FavItemComponent,
    UserMealsComponent,
    FavouriteComponent,
    IndividualGraphsComponent,
    MealParentComponent,
    MealItemComponent,
    ProfileComponent,
    PasswordChangeComponent,
    UsernameChangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
