import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFilter'
})
export class PriceFilterPipe implements PipeTransform {

  transform(value: any[], minMaxPrice: any[]) {
    if(value.length == 0 || minMaxPrice.length == 0)
      return value
    
    value = value.filter(item => item.pricePerServing>minMaxPrice[0])
    value = value.filter(item => item.pricePerServing<minMaxPrice[1])

    return value;
  }

}