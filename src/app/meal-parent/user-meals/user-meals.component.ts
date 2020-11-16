import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-user-meals',
  templateUrl: './user-meals.component.html',
  styleUrls: ['./user-meals.component.css']
})
export class UserMealsComponent implements OnInit {

  recipes
  isLoading: boolean = true
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartType = 'bar';
  public barChartLegend = true;

  //doughnuts
  public doughnutChartLabels = [];
  public doughnutChartData = [];
  public doughnutChartType = 'doughnut'
  public colours = [
    {
      backgroundColor: ["#8A56E2", "#C455E2", "#E255C6", "#E2558B", "#E27155", "#E2AC55", "#DDE255", "#A3E255", "#68E255", "#55E27D", "#55E2B8", "#55D2E2", "#5597E2", "#555CE2"],
      borderWidth: 0
    }
  ]


  isAuthenticated = false;
  private userSub: Subscription;
  constructor(private authService: AuthService, private mealService: MealService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });

    this.authService.user.subscribe(user => {
      if (user != null)
        this.authService.getMeals(user.id, user.token)
          .subscribe(res => {
            if (!!res) {
              this.isLoading = false
              let arr = Object.values(res)
              this.recipes = arr
              console.log(arr)

              //to bring all the units to grams
              arr = arr.map(item => item.nutrition.nutrients.map(nutrient => {
                if (nutrient.unit == 'mg')
                  nutrient.amount = nutrient.amount / 1000
                else if (nutrient.unit == 'IU')
                  nutrient.amount = (0.67 * nutrient.amount) / 1000
                return nutrient
              }))
              arr = arr.map(item => item.filter(nutrient => nutrient.amount > 1))//removing nutrients with very low value
              arr = arr.map(item => item.filter(nutrient => nutrient.title !== 'Calories'))//calories is not nutrient

              let total_nutrients = []
              arr.map(item => item.map(nutrient => {
                let flag = false
                for (let i = 0; i < total_nutrients.length; i++) {
                  if (nutrient.title == total_nutrients[i].title && flag == false) {
                    total_nutrients[i].amount += nutrient.amount
                    flag = true
                  }
                  if (flag == true)
                    break
                }
                if (flag == false)
                  total_nutrients.push({ title: nutrient.title, amount: nutrient.amount })
              }))

              this.doughnutChartData = [{ data: total_nutrients.map(item => item.amount), label: 'Nutrients' }]
              this.doughnutChartLabels = total_nutrients.map(item => item.title)
              /* for colour manipulation */
              if (total_nutrients.length < 7)
                this.colours = [{
                  backgroundColor: this.colours[0].backgroundColor.filter((item, index) => index % 2),
                  borderWidth: 0
                }]
              else if (total_nutrients.length <= 12) {
                this.colours[0].backgroundColor.splice(8, 2)
                this.colours = [{
                  backgroundColor: this.colours[0].backgroundColor,
                  borderWidth: 0
                }]
              }
            }
            /* end */
            else
              this.isLoading = false
              
            // this.barChartData = [{data: soln.map(item => item.amount), label: 'Nutrients'}]
            // this.barChartLabels = soln.map(item => item.title)
            // this.barChartData = [{data: arr[0].map(item => item.amount), label: 'Nutrients'}]
            // this.doughnutChartData = [{data: arr[0].map(item => item.amount), label: 'Nutrients'}]
            // this.barChartLabels = arr[0].map(item => item.title)
          })
    })

    this.mealService.deleted.subscribe(response => {
      if (response === "reload")
        this.ngOnInit();
    })


  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}