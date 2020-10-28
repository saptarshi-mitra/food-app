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
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './footer/footer.component';
import { FilterCuisinePipe } from './common/pipe/filter-cuisine.pipe';
import { FilterVegPipe } from './common/pipe/filter-veg.pipe';
import { PriceFilterPipe } from './common/pipe/price-filter.pipe';
import { FilterGlutenPipe } from './common/pipe/filter-gluten.pipe';
import { FilterDiaryProductsPipe } from './common/pipe/filter-diary-products.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    TrendingComponent,
    SearchResultComponent,
    DetailsComponent,
    FooterComponent,
    FilterCuisinePipe,
    FilterVegPipe,
    PriceFilterPipe,
    FilterGlutenPipe,
    FilterDiaryProductsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
