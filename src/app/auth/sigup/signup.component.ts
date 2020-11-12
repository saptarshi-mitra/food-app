import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  error:string;
  isLoading = false;

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const userName = form.value.firstName +" "+ form.value.lastName;    
    this.isLoading = true;
    //first signup new user
    this.authService.signUp(email, password).subscribe(response => {
      // console.log(response)
      //add userName after user is registered
      this.authService.registerDetails(userName,response.localId,response.idToken).subscribe(details =>{
        // console.log(details);
        this.isLoading = false;
        //redirect ro signin
        this.router.navigate(['/signin']);
      })
    }, error => {
      this.isLoading = false;
      this.error = error;
    })
  }
}