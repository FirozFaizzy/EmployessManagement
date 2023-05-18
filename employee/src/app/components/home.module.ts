import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { PrimeNgModule } from "./shared/prime.modules";
import { AuthGuard } from "../helper/auth,guard";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [PrimeNgModule, CommonModule, HomeRoutingModule],
  providers: [],
  bootstrap: [],
})
export class HomeModule {}
