import { Component, Injectable, Input, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from "@angular/common";
import { FormBuilder, Validators } from '@angular/forms';
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
  form;
  condition:boolean;
  isLogged:boolean;
  textUpdate:string;
  show:boolean = false;
  display;
  displayTimer;
  displayUpdate;
  displayUpdateTimer;
  newNote:string;
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

  constructor(private http:HttpClient,private userInfor: AuthService,private fb:FormBuilder) {
    this.form = fb.group({
      note: ['',Validators.required],
      datetime: ['',Validators.required]
    })
  }

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

  submit(value,timer){
    try{
      this.timearray =timer.split("T");
    this.time = this.timearray[1].split(":")
    this.hour = Math.abs((this.time[0] - this.d.getHours())*60);
    this.min = Math.abs(this.time[1] - this.d.getMinutes());
    this.sum = this.hour + this.min;
    this.textUpdate = value;
    //console.log((this.sum)*60000)
    this.display= setTimeout(function myFunc(){
      document.getElementById('demo').innerHTML = value;
      },(this.sum)*60000) 
    this.displayTimer = setTimeout(function playAudio(){
      let audio = new Audio();
      audio.src = "../../../assets/audio/drum.mp3";
      audio.load();
      audio.play();
    },(this.sum)*60000)
    this.condition=true;
    this.form.reset();
    }catch(error){}
  }

  edit(){
    this.show =! this.show;
  }
  update(value){
    clearInterval(this.display)
    clearInterval(this.displayTimer)
    try{
      this.time = this.timearray[1].split(":")
    this.hour = Math.abs((this.time[0] - this.d.getHours())*60);
    this.min = Math.abs(this.time[1] - this.d.getMinutes());
    this.sum = this.hour + this.min;
    this.newNote = value;
    //console.log(this.sum)
    this.displayUpdate = setTimeout(function myFunc(){
      document.getElementById('demo').innerHTML = value;
    },(this.sum)*60000)
    this.displayUpdateTimer = setTimeout(function playAudio(){
      let audio = new Audio();
      audio.src = "../../../assets/audio/drum.mp3";
      audio.load();
      audio.play();
    },(this.sum)*60000)
    }catch(error){}
    
  }

  delete(){
    clearInterval(this.display)
    clearInterval(this.displayTimer)
    clearInterval(this.displayUpdate)
    clearInterval(this.displayUpdateTimer)
  }

}
