import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterVeg',
  pure: false
})
export class FilterVegPipe implements PipeTransform {

  transform(value: any[], food_habit: any[]) {
    food_habit = food_habit.filter(item => item.checked)
    if(value.length == 0 || food_habit.length == 0)
      return value.map(item => item)

    if(food_habit.length == 2) //both veg and non-veg are marked
      return value.map(item => item)

    if(food_habit[0].name == 'Veg')
      return value.filter( item => item.vegetarian )
    else
      return value.filter( item => !item.vegetarian )
  } 

}