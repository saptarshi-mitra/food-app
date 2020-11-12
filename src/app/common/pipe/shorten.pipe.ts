import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, limit : number = 3): string{
    let wordCount = value.split(" ").length;
    if(wordCount > limit){
      return value.split(" ").splice(0,limit).join(" ") + "...";
    }
    else{
      return value;
    }
  }

}
