import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export interface UserName {
  userName: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  userName = new Subject<UserName>();

  constructor(private http: HttpClient, private router: Router) { }

  signIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAHwgKUz04OEuff0r1e5PcJN1T94BbKsR8',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      })
    )
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAHwgKUz04OEuff0r1e5PcJN1T94BbKsR8',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError)
      // tap(resData => {
      //   this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      // })
    )
  }

  registerDetails(userName: string, localId: string, idToken: string) {
    return this.http.put(`https://food-app-385cd.firebaseio.com/users/${localId}.json?auth=${idToken}`,
      {
        "userName": userName
      });
  }

  getDetails(localId: string, idToken: string) {
    return this.http.get<UserName>(`https://food-app-385cd.firebaseio.com/users/${localId}.json?auth=${idToken}`)
  }


  getMeals(localId: string, idToken: string) {
    return this.http.get(`https://food-app-385cd.firebaseio.com/users/${localId}/meal.json?auth=${idToken}`)
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  this.user.next(user);
  this.autoLogout(expiresIn * 1000);
  localStorage.setItem('userData', JSON.stringify(user));
}



  private handleError(errorRes: HttpErrorResponse) {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return throwError(errorMessage);
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return throwError(errorMessage);
}

logout() {
  this.user.next(null);
  this.router.navigate(['/']);
  localStorage.removeItem('userData');
  if (this.tokenExpirationTimer) {
    clearTimeout(this.tokenExpirationTimer);
  }
  this.tokenExpirationTimer = null;
}

autoLogout(expirationDuration: number) {
  this.tokenExpirationTimer = setTimeout(() => {
    this.logout();
  }, expirationDuration);
}

autoLogin() {
  const userData: {
    email: string;
    id: string;
    _token: string;
    _tokenExpirationDate: string;
  } = JSON.parse(localStorage.getItem('userData'));
  if (!userData) {
    return;
  }

  const loadedUser = new User(
    userData.email,
    userData.id,
    userData._token,
    new Date(userData._tokenExpirationDate)
  );

  if (loadedUser.token) {
    this.user.next(loadedUser);
    const expirationDuration =
      new Date(userData._tokenExpirationDate).getTime() -
      new Date().getTime();
    this.autoLogout(expirationDuration);
  }
}

}
