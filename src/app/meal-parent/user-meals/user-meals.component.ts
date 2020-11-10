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

  userName = ''
  recipes
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
      backgroundColor: ["#d00", "#f55", "#ffb266", "#dd6e00", "#ff9", "#ee0", "#6f6", "#0d0", "#99f", "#33f", "#8600e8", "#4b0082", "#ac00f5", "#7000a0"],
      borderWidth: 0
    }
  ]


  isAuthenticated = false;
  private userSub: Subscription;
  constructor(private authService: AuthService, private mealService: MealService) { }

  ngOnInit(): void {
    this.userName = "";
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if (!!user) {
        this.authService.getDetails(user.id, user.token).subscribe(username => {
          this.userName = username.userName;
        })
      }
    });

    this.authService.user.subscribe(user => {
      if(user != null)
        this.authService.getMeals(user.id,user.token)
          .subscribe(res => {
            let arr = Object.values(res)
            this.recipes = arr
            console.log(arr)

            // this.barChartData = [{data: soln.map(item => item.amount), label: 'Nutrients'}]
            // this.barChartLabels = soln.map(item => item.title)






            //to bring all the units to grams
            arr = arr.map(item => item.nutrition.nutrients.map(nutrient => {
              if(nutrient.unit == 'mg')
                nutrient.amount = nutrient.amount/1000
              else if(nutrient.unit == 'IU')
                nutrient.amount = (0.67*nutrient.amount)/1000
              return nutrient
            }))
            arr = arr.map(item => item.filter(nutrient => nutrient.amount > 1))//removing nutrients with very low value
            arr = arr.map(item => item.filter(nutrient => nutrient.title !== 'Calories'))//calories is not nutrient

            let total_nutrients = []
            arr.map(item => item.map(nutrient => {
              let flag = false
              for(let i=0; i<total_nutrients.length; i++){
                if(nutrient.title == total_nutrients[i].title && flag==false){
                  total_nutrients[i].amount += nutrient.amount
                  flag=true
                }
                if(flag==true)
                  break
              }
              if(flag == false)
                total_nutrients.push({title: nutrient.title, amount: nutrient.amount})
            }))

            this.doughnutChartData = [{data: total_nutrients.map(item => item.amount), label: 'Nutrients'}]
            this.doughnutChartLabels = total_nutrients.map(item => item.title)
            // this.barChartData = [{data: soln.map(item => item.amount), label: 'Nutrients'}]
            // this.barChartLabels = soln.map(item => item.title)
            // this.barChartData = [{data: arr[0].map(item => item.amount), label: 'Nutrients'}]
            // this.doughnutChartData = [{data: arr[0].map(item => item.amount), label: 'Nutrients'}]
            // this.barChartLabels = arr[0].map(item => item.title)
          })
      })

      this.mealService.deleted.subscribe(response => {
        if(response==="reload")
          this.ngOnInit();
      })
  

    }

    ngOnDestroy() {
      this.userSub.unsubscribe();
    }

}