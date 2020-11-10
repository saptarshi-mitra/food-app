import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  deleted = new Subject<string>();

  constructor() { }
}
