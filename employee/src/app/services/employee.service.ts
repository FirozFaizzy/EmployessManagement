import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

import { task } from "../models/task";

@Injectable({ providedIn: "root" })
export class EmployeeService {
  private taskList: any = [];
  private dataSource = new BehaviorSubject(this.taskList);
  public task = this.dataSource.asObservable();
  constructor(private router: Router, private http: HttpClient) {}

  updateTask(value: any[]) {
    this.dataSource.next(value);
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }

  getAllEmployeees() {
    return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/users`);
  }
  getTask(id: number) {
    return this.http.get<task[]>(
      `https://jsonplaceholder.typicode.com/users/${id}/todos`
    );
  }
}
