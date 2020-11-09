import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button'

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
import { ChartsModule } from 'ng2-charts';
import { FavouriteComponent } from './favourite/favourite.component';
import { FavItemComponent } from './favourite/fav-item/fav-item.component';
import { NotesComponent } from './notes/notes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MealParentComponent } from './meal-parent/meal-parent.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordChangeComponent } from './profile/password-change/password-change.component';
import { MealComponent } from './meal-parent/meal/meal.component';
import { UserMealsComponent } from './meal-parent/user-meals/user-meals.component';
import { IndividualGraphsComponent } from './meal-parent/user-meals/individual-graphs/individual-graphs.component';
import { MealItemComponent } from './meal-parent/meal/meal-item/meal-item.component';

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
    NotesComponent,
    MealParentComponent,
    MealItemComponent,
    ProfileComponent,
    PasswordChangeComponent
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
    DragDropModule,
    MatTabsModule,
    MatTooltipModule,
    MatMenuModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
