import { Component } from '@angular/core';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee_Management';
     user: any;

    constructor(private employeService:EmployeeService) {
      this.user=localStorage.getItem('user')
    }

    logout() {
        this.employeService.logout();
        this.user=null;
    }
}
