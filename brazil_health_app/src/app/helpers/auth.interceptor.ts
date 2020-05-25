import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private token = localStorage.getItem(environment.authTokenKey);

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token) {
      request = request.clone(
        {
          setHeaders: {
            Authorization: `Bearer ${this.token}`
          }
        }
      );
    }

    return next.handle(request).pipe(
      tap(),
      catchError(response => {
        if (response instanceof HttpErrorResponse && (response.status == 401 || response.status == 0)) {
          localStorage.removeItem(environment.authTokenKey);
          this.router.navigate(['/auth/login']);
        }
        return throwError(response);
      })
    );;
  }
}
