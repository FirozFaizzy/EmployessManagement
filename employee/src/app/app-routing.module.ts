import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./core/login/login.component";
import { AuthGuard } from "./helper/auth,guard";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login",
  },
  { path: "login", component: LoginComponent },

  {
    path: "admin",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./components/home.module").then((m) => m.HomeModule),
  },
  { path: "**", redirectTo: "login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
