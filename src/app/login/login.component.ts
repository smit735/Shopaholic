import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Login } from "../login";
import { Router } from '@angular/router';
import { AuthguardserviceService } from "../authguardservice.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  login: Login;
  constructor(private authguardservice: AuthguardserviceService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {

    if (this.authguardservice.gettoken()) {
      this.router.navigate(['/admin/stores'])

    }
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9.@]*')]],

      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
      )]],

    });
    this.myForm.valueChanges.subscribe(data => {
      console.log(data.email, data.password);
      if (data.email === "mehtasmit735@gmail.com" && data.password === "Smit1@") {

        localStorage.setItem('SessionUser', "1")
        this.router.navigate(['/admin/stores'])

      }
      else {

      }

    })
  }
}
