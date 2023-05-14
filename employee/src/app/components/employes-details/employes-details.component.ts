import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { task } from '../../models/task';
import { EmployeeService } from '../../services/employee.service';

import { first } from 'rxjs';
@Component({
  selector: 'app-employes-details',
  templateUrl: './employes-details.component.html',
  styleUrls: ['./employes-details.component.css']
})
export class EmployesDetailsComponent implements OnInit {
  addTask: FormGroup;
  isCompleted:boolean=false;
  isNotCompleted:boolean=false;
  filterFields:any=['id','task','status'];
  showNewtask:boolean=false;
  submitted:boolean=false;
  taskList:task[];
  tempTask:task[];
  totalRecords:number=0;
  userId:number=0;

  constructor( private fb: FormBuilder,private route:ActivatedRoute ,private employeeService:EmployeeService,private router:Router) { }

  ngOnInit(): void {
     this.route.params.subscribe((params) => {
      this.userId = +params["id"] || 0;
      this.getTask(this.userId)
      this.createForm();
    });
    
  }

  onClickTask(value:boolean=true):void{
  this.showNewtask=value;
  this.submitted=false;
  this.addTask.reset();
  }

  onClickBack():void{
  this.router.navigate(["admin/employees"]);
  }

  OnClickFilter(status:string):void{
      this.taskList=this.tempTask;
    if(status==='Completed'){
      this.isCompleted=!this.isCompleted;
      this.isNotCompleted=false;
       if(this.isCompleted)
    this.getFilterData(true);
      }else{
         this.isNotCompleted=!this.isNotCompleted;
         this.isCompleted=false;
      if(this.isNotCompleted)
         this.getFilterData(false)
         }
    this.totalRecords=this.taskList.length;
    }
      // convenience getter for easy access to form fields
    get f() { return this.addTask.controls; }

  formSubmit():void{
   this.submitted=true;
     if (this.addTask.invalid) { //check the validation.
            return;
        }

        var data:task={
          id:this.totalRecords +1,
          title:this.addTask.controls.description.value,
          status:'Not Completed',
          completed:false
        }
        this.taskList.unshift(data);
        this.tempTask=this.taskList;
        this.totalRecords=this.taskList.length;
  }

  private createForm():void  //form creation
  {  
     this.addTask = this.fb.group({
      description: ["", [Validators.required]],
    });
  }

  private getFilterData(isCompleted:boolean):void{  //filter based on status
   this.taskList=this.taskList.filter((val)=>{
   return val.completed===isCompleted
   });
   }

  private getStatus(status:any):string{   // return status
    if(status===true){
      return 'Completed'
    }else{
      return 'Not Completed'
    }
  }

  private getTask(id:number):void{
  this.employeeService.getTask(id)
            .pipe(first())
            .subscribe(res =>{
              this.taskList = res;
               this.taskList.map((data, index) => {         //added status for filter
             this.taskList[index].status = this.getStatus(
            data.completed
          );
       });
         this.employeeService.updateTask(this.taskList);
         this.tempTask=this.taskList;
         this.totalRecords =   this.taskList.length;   
            } );
  }
}
