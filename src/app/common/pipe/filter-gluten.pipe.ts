import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterGluten',
  pure: false
})
export class FilterGlutenPipe implements PipeTransform {

  transform(value: any[], gluten_products: any[]) {
    gluten_products = gluten_products.filter(item => item.checked)
    if(value.length == 0 || gluten_products.length == 0)
      return value

    if(gluten_products.length == 2) //both gluten and non-gluten are marked
      return value

    if(gluten_products[0].name == 'Gluten')
      return value.filter( item => !item.glutenFree )
    else
      return value.filter( item => item.glutenFree )
  } 

}
