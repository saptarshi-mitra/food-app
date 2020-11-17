import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/common/services/food.service';
import { RecipeSuggest } from 'src/app/common/shared/model/recipe-suggest';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  recipe: string
  suggestions: RecipeSuggest
  constructor(private _service:FoodService) { }

  ngOnInit(): void {
  }

  showSuggestion(){
    this._service.getSuggestions(this.recipe).subscribe(response => this.suggestions = response['results'])
  }

}
