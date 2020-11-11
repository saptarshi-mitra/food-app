import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { NotesComponent } from './notes/notes.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'food-app';

  constructor(private authService: AuthService) { }
  
  ngOnInit() {
    this.authService.autoLogin();
  }
  

}
