import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Login } from "../login";
import { Router } from '@angular/router';
import { AuthguardserviceService } from "../authguardservice.service";
import { StoresserviceService } from '../storesservice.service';
import { UserauthguardService } from '../userauthguard.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;

  constructor(private authguardservice: AuthguardserviceService, private router: Router, private fb: FormBuilder, private StoresServiceService: StoresserviceService, public Authguardservice: UserauthguardService) { }
  mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  ngOnInit() {

    if (this.authguardservice.gettoken()) {
      this.router.navigate(['/admin/dashboard'])

    }
    if (this.Authguardservice.gettoken()) {
      this.router.navigate(['/userstores'])

    }
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.mailformat)]],

      pass: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
      )]],

    });



  }
  login() {

    this.StoresServiceService.login(this.myForm.value).subscribe((res: any) => {
      localStorage.setItem('username', res.user.name)
      localStorage.setItem('addr', res.user.addr)

      localStorage.setItem('useremailname', res.user.email)

      localStorage.setItem('userid', res.user._id)

      localStorage.setItem('usersession', "1")
      this.router.navigate(['/userstores'])
    });

  }
  forgotpassword() {
    this.router.navigate(['/forgotpassword'])
  }

  register() {
    this.router.navigate(['/register'])
  }
  adminlogin() {
    this.router.navigate(['/admin/login'])
  }
}






