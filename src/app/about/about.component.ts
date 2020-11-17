import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }
  id = [{
    "name":"Saptarshi Mitra",
    "img":"assets/images/sap_img.jpg"
  },{
    "name":"Sumon Nath",
    "img":"assets/images/sumon.jpg"
  },{
    "name":"Himanshu Khandelwal",
    "img":"assets/images/himk.jpg"
  }]
  ngOnInit(): void {
  }

}
