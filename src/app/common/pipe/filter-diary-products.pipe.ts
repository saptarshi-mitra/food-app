import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDiaryProducts',
  pure: false
})
export class FilterDiaryProductsPipe implements PipeTransform {

  transform(value: any[], diary_products: any[]) {
    diary_products = diary_products.filter(item => item.checked)
    if(value.length == 0 || diary_products.length == 0)
      return value.map(item => item)

    if(diary_products.length == 2) //both dairy and non-dairy are marked
      return value.map(item => item)

    if(diary_products[0].name == 'Dairy')
      return value.filter( item => !item.dairyFree )
    else
      return value.filter( item => item.dairyFree )
  } 

}
