import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  isLoading = false;
  error:string;

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    this.authService.signIn(email, password).subscribe(response => {
      //console.log(response);
      this.isLoading = false;
      this.router.navigate(['/'])
    }, error => {
      this.isLoading = false;
      this.error = error;
    })
  }

}