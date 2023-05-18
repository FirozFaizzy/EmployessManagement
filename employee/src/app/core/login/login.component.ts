import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MessageService } from "primeng/api";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl = "";

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.removeItem("user");
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.login(this.f.username.value, this.f.password.value);
  }

  login(username: string, password: string): void {
    const user: any = [{ userName: "fingent", password: "fingent" }];
    console.log(username, password);
    if (user[0].userName == username && user[0].password == password) {
      localStorage.setItem("user", JSON.stringify(user));
      this.loading = false;
      this.router.navigate(["admin/employees"]);
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Validation Failed",
        detail: "‘Incorrect username or password.",
      });
      this.loading = false;
    }
  }
}
