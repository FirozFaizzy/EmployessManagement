import { Component } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  user: any;

  constructor(private employeService: EmployeeService) {
    this.user = localStorage.getItem("user");
  }

  logout() {
    this.employeService.logout();
    this.user = null;
  }
}
