import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../common/services/food.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  recipes = []
  query: string
  constructor(private _service: FoodService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.query = this._route.snapshot.paramMap.get('name')
    console.log(this.query)
    this._service.getSearchResult(this.query)
      .subscribe(response => this.recipes = response['results'] )
  }

}