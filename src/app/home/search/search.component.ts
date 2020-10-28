import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/common/services/food.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  recipe
  suggestions
  constructor(private _service:FoodService) { }

  ngOnInit(): void {
  }

  showSuggestion(){
    this._service.getSuggestions(this.recipe).subscribe(response => this.suggestions = response['results'])
  }

}