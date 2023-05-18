import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EmployesListComponent } from "./employes-list/employes-list.component";
import { EmployesDetailsComponent } from "./employes-details/employes-details.component";
import { PrimeNgModule } from "./shared/prime.modules";
import { AuthGuard } from "../helper/auth,guard";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [EmployesListComponent, EmployesDetailsComponent],
  imports: [
    PrimeNgModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "",
        pathMatch: "full",
        redirectTo: "list",
      },
      {
        path: "list",
        component: EmployesListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "tasks/:id",
        component: EmployesDetailsComponent,
        canActivate: [AuthGuard],
      },
    ]),
  ],
  providers: [],
  bootstrap: [],
})
export class EmployeModule {}
