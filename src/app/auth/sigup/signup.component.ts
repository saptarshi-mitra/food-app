import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  error:string;
  isLoading = false;

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    
    this.isLoading = true;
    this.authService.signUp(email, password).subscribe(response => {
      // console.log(response)
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.error = error;
    })
  }
}
