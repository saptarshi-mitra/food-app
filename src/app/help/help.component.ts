import { Component, OnInit } from '@angular/core';
import { ViewportScroller, CommonModule } from "@angular/common";

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor(private vps: ViewportScroller) { }

  public onClick(elementID: string):void {
    this.vps.scrollToAnchor(elementID);
  }
  ngOnInit(): void {
  }

}
