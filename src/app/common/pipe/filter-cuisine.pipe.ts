import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCuisine',
  pure: false
})
export class FilterCuisinePipe implements PipeTransform {

  transform(value: any[], cuisineNames: any[]) {
    let resultArray = []
    cuisineNames = cuisineNames.filter(item => item.checked)
    if(value.length == 0 || cuisineNames.length == 0)
      return value

    value.map(item => item.cuisines.map(item1 => {
      cuisineNames.map(item2 => {
        if(item2.name == item1)
          if(!resultArray.includes(item))
            resultArray.push(item)
      })
    }))
    return resultArray;
  }

}
