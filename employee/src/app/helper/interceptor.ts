import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { EmployeeService } from "../services/employee.service";

import { MessageService } from "primeng/api";

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.employeeService.logout();
        }
        const error = err.error.message || err.statusText;
        this.messageService.add({
          severity: "error",
          summary: "Failed",
          detail: error,
        });

        return throwError(error);
      })
    );
  }
}
