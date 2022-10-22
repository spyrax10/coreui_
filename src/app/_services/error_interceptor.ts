import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 404) {
                this.router.navigate(['/404']);
            }
            else if (err.status === 500 || err.status === 0) {
                this.router.navigate(['/500']);
            }
            else if (err.status === 401) {
                this.router.navigate(['/401']);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}