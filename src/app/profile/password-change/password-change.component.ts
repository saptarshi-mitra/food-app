import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit, OnDestroy {

  form = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    retypedpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  isChanged = false
  userSub: Subscription
  error: string
  user: User

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(res => this.user = res);
  }

  onSubmit(){
    if(this.password.value == this.retypedpassword.value){
      this.authService.changePassword(this.user.token, this.password.value, true).subscribe((res: any) => {
        this.isChanged = true
        const user = new User(this.user.email, this.user.id, res.idToken, this.user.tokenExpirationDate);
        this.authService.user.next(user);
        this.form.reset()
      }, error => this.error = error)
    }
    else{
      this.form.setErrors({
        passwordDoesNotMatch: true
      })
    }
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  get password(){ return this.form.get('password') }
  get retypedpassword(){ return this.form.get('retypedpassword') }

}