import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './home/search/search.component';
import { TrendingComponent } from './home/trending/trending.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { DetailsComponent } from './details/details.component';

import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './footer/footer.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/sigup/signup.component';
import { HeaderComponent } from './header/header.component';
import { LoadingSpinnerComponent } from './common/shared/loading-spinner/loading-spinner.component';

import { AboutComponent } from './about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilterCuisinePipe } from './common/pipe/filter-cuisine.pipe';
import { FilterVegPipe } from './common/pipe/filter-veg.pipe';
import { PriceFilterPipe } from './common/pipe/price-filter.pipe';
import { FilterGlutenPipe } from './common/pipe/filter-gluten.pipe';
import { FilterDiaryProductsPipe } from './common/pipe/filter-diary-products.pipe';
import { CarouselComponent } from './home/carousel/carousel.component';



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
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
