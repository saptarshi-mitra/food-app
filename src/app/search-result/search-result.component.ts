import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../common/services/food.service';
import { RecipeSearchResult, IndividualSearchRecipe } from "../common/shared/model/recipe-search-result";

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
    {name: 'Thai', value: 3, checked: false},
    {name: 'European', value: 4, checked: false},
    {name: 'German', value: 5, checked: false},
    {name: 'Indian', value: 6, checked: false},
    {name: 'Chinese', value: 7, checked: false},
    {name: 'French', value: 8, checked: false}
  ]

  food_habit = [
    {name: 'Veg', value: 1, checked: false},
    {name: 'Non-veg', value: 2, checked: false}
  ]

  dairy = [
    {name: 'Dairy', value: 1, checked: false},
    {name: 'Dairy Free', value: 2, checked: false}
  ]

  gluten = [
    {name: 'Gluten', value: 1, checked: false},
    {name: 'Gluten Free', value: 2, checked: false}
  ]

  min_value: number = 0
  max_value: number = 5000

  recipes: IndividualSearchRecipe[] = []
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
    if(parseInt(this.query)) //check if the user has clicked form suggestions, search with id
      this._service.getData(+(this.query)).subscribe((response: IndividualSearchRecipe) => {
        this.recipes = response as unknown as []
        this.config = {
          itemsPerPage: 1,
          currentPage: 1,
          totalItems: this.recipes.length
        };
      })
    else{
      this._service.getSearchResult(this.query) //if the user searches with key word
        .subscribe((response: RecipeSearchResult) => {
          this.recipes = response.results
          this.config = {
            itemsPerPage: 5,
            currentPage: 1,
            totalItems: this.recipes.length
          };
      })
    }
  }
  lowToHigh = () => this.recipes.sort((a,b) => a.pricePerServing - b.pricePerServing)

  highToLow = () => this.recipes.sort((a,b) => b.pricePerServing - a.pricePerServing)

  sortHealthScore = () => this.recipes.sort((a,b) => b.healthScore - a.healthScore)

  removeAllFilters(){
    this.option_cuisines.map(item => item.checked = false)
    this.food_habit.map(item => item.checked = false)
    this.dairy.map(item => item.checked = false)
    this.gluten.map(item => item.checked = false)
    this.min_value = 0
    this.max_value = 5000
  }

  pageChanged(event){
    this.config.currentPage = event
  }

}