import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from "@angular/common";

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor(private vps: ViewportScroller) { }

  showID: boolean = false;
  showCollab: boolean = false;
  showFB: boolean = false;

  public onClick(elementID: string):void {
    this.vps.scrollToAnchor(elementID)
  }
  ngOnInit(): void {
  }

  toggleID(){
    this.showID =! this.showID;
  }
  toggleCollab(){
    this.showCollab =! this.showCollab;
  }
  toggleFB(){
    this.showFB =! this.showFB;
  }
}
