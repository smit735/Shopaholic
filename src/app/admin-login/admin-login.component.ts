import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Login } from "../login";
import { Router } from '@angular/router';
import { AuthguardserviceService } from "../authguardservice.service";
import { StoresserviceService } from '../storesservice.service';
import { UserauthguardService } from '../userauthguard.service';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  myForm: FormGroup;

  constructor(private authguardservice: AuthguardserviceService, private router: Router, private fb: FormBuilder, private StoresServiceService: StoresserviceService, public Authguardservice: UserauthguardService) { }
  mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  ngOnInit() {

    if (this.authguardservice.gettoken()) {
      this.router.navigate(['/admin/dashboard'])

    }

    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.mailformat)]],

      pass: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
      )]],

    });



  }
  login() {

    if (this.myForm.value.email === "mehtasmit735@gmail.com" && this.myForm.value.pass === "Smit1@") {

      localStorage.setItem('SessionUser', "1")
      this.router.navigate(['/admin/dashboard'])

    }

  }
  forgotpassword() {
    this.router.navigate(['/forgotpassword'])
  }
  userlogin() {

    this.router.navigate(['login'])

  }


}
