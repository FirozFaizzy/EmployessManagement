import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { first } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employes-list',
  templateUrl: './employes-list.component.html',
  styleUrls: ['./employes-list.component.css']
})
export class EmployesListComponent implements OnInit {
 @ViewChild("dt") tt: Table;
  employeeList:any=[];
  filterFields:any=['name','username'];
  totalRecords:number=0;
  constructor(private employeeService:EmployeeService,
    private router:Router) { }

  ngOnInit(): void {
   this.getEmployees();
  }

  onClickEmployee(id:number):void{
    if(id >0){}
    this.router.navigate([
      "admin/employees/tasks",
      id,
    ]);
  }

  private getEmployees():void{
      this.employeeService.getAllEmployeees()
            .pipe(first())
            .subscribe(res =>{
              this.employeeList = res
              this.totalRecords =   this.employeeList.length;   
            } );
  }

}
