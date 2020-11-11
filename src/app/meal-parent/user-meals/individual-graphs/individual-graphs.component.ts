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
  public colours = [
    {
      backgroundColor: ["#8A56E2", "#C455E2", "#E255C6", "#E2558B", "#E27155", "#E2AC55", "#DDE255", "#A3E255", "#68E255", "#55E27D", "#55E2B8", "#55D2E2", "#5597E2", "#555CE2"],
      borderWidth: 0
    }
  ]
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

    if(data.length<7)
      this.colours = [{
        backgroundColor: this.colours[0].backgroundColor.filter((item, index) => index%2),
        borderWidth: 0
      }]
    else if(data.length<=12){
      this.colours[0].backgroundColor.splice(8,2)
      this.colours = [{
        backgroundColor: this.colours[0].backgroundColor,
        borderWidth: 0
      }]
    }

    this.doughnutChartData = [{data: data.map(item => item.amount), label: 'Nutrients'}]
    this.doughnutChartLabels = data.map(item => item.title)
  }

}