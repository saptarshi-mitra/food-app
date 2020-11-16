import { Component, Injectable, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from "@angular/common";
import { FormBuilder } from '@angular/forms';
import { isNgTemplate } from '@angular/compiler';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn:'root'
})
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  d = new Date();
  condition:boolean;
  isLogged:boolean;
  result="";
  user;
  data;
  localId: string = "";
  idToken: string = "";
  email:string = "";
  timearray=[];
  time=[];
  hour:number;
  min:number;
  sum:number;

  constructor(private http:HttpClient,private userInfor: AuthService) {}

  ngOnInit(): void {
    this.userInfor.user.subscribe(response =>{
      this.user=response;
      this.email = this.user.email;
      this.localId = this.user.id;
      this.idToken = this.user._token;
      console.log(this.localId)
    })
    this.email === '' ? this.isLogged = false : this.isLogged = true;
  }

  save(value){
    this.http.patch(`https://food-app-385cd.firebaseio.com/users/${this.localId}/notes.json?auth=${this.idToken}`,{
      "note":value
    }).subscribe(response =>{
      console.log(response)
    })
    
  }
  submit(timer){
    this.timearray =timer.split("T");
    this.time = this.timearray[1].split(":")
    this.hour = Math.abs((this.time[0] - this.d.getHours())*60);
    this.min = Math.abs(this.time[1] - this.d.getMinutes());
    this.sum = this.hour + this.min;
    this.http.get(`https://food-app-385cd.firebaseio.com/users/${this.localId}/notes.json?auth=${this.idToken}`).subscribe(response =>{
      setTimeout(function myFunc(){
        this.result = response['note'];
        document.getElementById('demo').innerHTML = this.result;
      },(this.sum)*60000)
    });
    setTimeout(function playAudio(){
      let audio = new Audio();
      audio.src = "../../../assets/audio/drum.mp3";
      audio.load();
      audio.play();
    },(this.sum)*60000)
    this.condition=true;
  }




}
