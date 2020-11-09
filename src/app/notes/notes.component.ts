import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from "@angular/common";
import { FormBuilder } from '@angular/forms';
import { isNgTemplate } from '@angular/compiler';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  d = new Date();
  show: boolean;
  isLogged:boolean;
  user;
  data;
  localId: string = "";
  idToken: string = "";
  email:string = "";
  note="";
  date="";
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  timePeriods = [
    'Breakfast',
    'Lunch',
    'Snacks',
    'Dinner'
  ];
  timePeriod = [
    'Breakfast',
    'Lunch',
    'Snacks',
    'Dinner'
  ];
  days=[
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]
  constructor(private http:HttpClient,private userInfor: AuthService) {
   }

  ngOnInit(): void {
    this.userInfor.user.subscribe(response =>{
      this.user=response;
      console.log(response)
      this.email = this.user.email;
      this.localId = this.user.id;
      this.idToken = this.user._token;
      console.log(this.localId)
    })
    this.email === '' ? this.isLogged = false : this.isLogged = true;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
  }

  add(i,value,Period){
    this.http.patch(`https://food-app-385cd.firebaseio.com/users/${this.localId}/notes/${this.timePeriod[i]}.json?auth=${this.idToken}`,{
      "note":value,
      "day":this.days[this.d.getDay()-1],
      "date":this.d.getDate(),
      "month":this.months[this.d.getMonth()],
      "timePeriod":Period,
      "year":this.d.getFullYear()
    }).subscribe(response =>{
      console.log(response)
    })
  }

  getData(value){
    this.show =! this.show;
    this.http.get(`https://food-app-385cd.firebaseio.com/users/${this.localId}/notes/${this.timePeriod[value]}.json?auth=${this.idToken}`).subscribe(response =>{
      this.data = response
      this.note = this.data.note;
      this.date = this.data.date + " " +this.data.month +" "+this.data.year+" "+this.data.day;
    })
  }
}
