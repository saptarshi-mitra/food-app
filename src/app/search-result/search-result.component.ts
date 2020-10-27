import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../common/services/food.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  config: {
    itemsPerPage: number,
    currentPage: number,
    totalItems: number
  }

  option_cuisines = [
    {name: 'Mediterranean', value: 1, checked: false},
    {name: 'Italian', value: 2, checked: false},
    {name: 'European', value: 3, checked: false},
    {name: 'Indian', value: 4, checked: false},
  ]

  recipes = []
  query: string
  constructor(private _service: FoodService, private _route: ActivatedRoute) { 
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.recipes.length
    }
  }

  ngOnInit(): void {
    this.query = this._route.snapshot.paramMap.get('name')
    this._service.getSearchResult(this.query)
      .subscribe(response => this.recipes = response['results'] )
  }

  lowToHigh = () => this.recipes.sort((a,b) => a.pricePerServing - b.pricePerServing)

  highToLow = () => this.recipes.sort((a,b) => b.pricePerServing - a.pricePerServing)

  sortHealthScore = () => this.recipes.sort((a,b) => b.healthScore - a.healthScore)

  removeAllFilters(){
    this.option_cuisines = [
      {name: 'Mediterranean', value: 1, checked: false},
      {name: 'Italian', value: 2, checked: false},
      {name: 'European', value: 3, checked: false},
      {name: 'Indian', value: 4, checked: false},
    ]
  }

  pageChanged(event){
    this.config.currentPage = event
  }

}