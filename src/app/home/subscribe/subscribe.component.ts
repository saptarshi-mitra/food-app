import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewsletterService } from 'src/app/common/services/newsletter.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  constructor(private newletter: NewsletterService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    const firstName: string = form.value.firstName 
    const lastName: string = form.value.lastName 
    const email: string = form.value.email
    const fullName = firstName + ' ' + lastName
    form.reset()
    this.openSnackBar(`Please wait while we register your email`, '', {verticalPosition: 'top', horizontalPosition: 'end', panelClass: ['success-snackbar']})
    this.newletter.subscribeToNewsletter(fullName, email).subscribe(res => {
      if(res)
        this.openSnackBar(`You have succesfully subscibed to our newsletter`, `Dismiss`, {duration: 5000, verticalPosition: 'top', horizontalPosition: 'end', panelClass: ['success-snackbar']})
      else
        this.openSnackBar(`There was some error`, `Dismiss`, {duration: 5000, verticalPosition: 'top', horizontalPosition: 'end', panelClass: ['error-snackbar']})
      }, err => {
        this.openSnackBar(err, `Dismiss`, {duration: 5000, verticalPosition: 'top', horizontalPosition: 'end', panelClass: ['error-snackbar']})
    })
  }

  openSnackBar(message: string, dismiss: string, config: {}){
    this.snackbar.open(message, dismiss, config)
  }

}
