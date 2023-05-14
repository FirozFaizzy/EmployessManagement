import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';

import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-employes-list',
  templateUrl: './employes-list.component.html',
  styleUrls: ['./employes-list.component.css']
})
export class EmployesListComponent implements OnInit , OnDestroy {
 @ViewChild("dt") tt: Table;
  employeeList:any=[];
  filterFields:any=['name','username'];
  loading:boolean=true;
  totalRecords:number=0;

   private destroy$: Subject<void> = new Subject();
  constructor(private employeeService:EmployeeService,
    private router:Router) { }

  ngOnInit(): void {
   this.getEmployees();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
            .pipe(takeUntil(this.destroy$))
            .subscribe(res =>{
              this.employeeList = res;
              this.loading=false;
              this.totalRecords =   this.employeeList.length;   
            } );
  }

}
