import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private http: HttpClient) { }

  subscribeToNewsletter(name: string, email: string){
    return this.http.post(`https://hungry-time.herokuapp.com/sendmail`, {
      "name": name,
      "email": email
    }).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 404)
          return throwError(`Some weird error has occured`);
        return throwError(`Another weird error has occured`);
      })
    )
  }
}
