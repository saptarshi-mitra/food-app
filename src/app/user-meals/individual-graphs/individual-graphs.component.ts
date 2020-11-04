import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-individual-graphs',
  templateUrl: './individual-graphs.component.html',
  styleUrls: ['./individual-graphs.component.css']
})
export class IndividualGraphsComponent implements OnInit {

  @Input() recipe

  public doughnutChartLabels = [];
  public doughnutChartData = [];
  public doughnutChartType = 'doughnut'
  constructor() { }

  ngOnInit(): void {
    let data = this.recipe.nutrition.nutrients
    data = data.map(nutrient => {
      if(nutrient.unit == 'mg')
        nutrient.amount = nutrient.amount/1000
      else if(nutrient.unit == 'IU')
        nutrient.amount = (0.67*nutrient.amount)/1000
      return nutrient
    })
    data = data.filter(nutrient => nutrient.amount > 1)//removing nutrients with very low value
    data = data.filter(nutrient => nutrient.title !== 'Calories')//calories is not nutrient

    this.doughnutChartData = [{data: data.map(item => item.amount), label: 'Nutrients'}]
    this.doughnutChartLabels = data.map(item => item.title)
  }

}