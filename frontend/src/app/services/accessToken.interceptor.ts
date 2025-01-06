import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request if you need to add headers (e.g., Authorization)
        const token = localStorage.getItem('api_token'); // Or however you're storing your token
        const clonedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}` // Add the Authorization header
          }
        });
        return next.handle(clonedRequest).pipe(
          catchError((error: HttpErrorResponse) => {
            if(error.statusText == "Unauthorized"){
                localStorage.clear();
                this.router.navigate(['auth/signin']);
            }
            // Rethrow the error so other parts of your app can handle it
            return throwError(() => error);
          })
        );
    }
}
