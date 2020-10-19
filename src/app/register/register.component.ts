import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoresserviceService } from '../storesservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  constructor(private StoresServiceService: StoresserviceService, private router: Router) { }
  user = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    addr: new FormControl('', Validators.required),
    pass: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
    )]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.mailformat)]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(10)])
  });

  register() {
    if (this.user.valid) {
      this.StoresServiceService.adduser(this.user.value).subscribe(res => {


      });
      this.router.navigate(['/login'])
    }
  }
  ngOnInit(): void {
  }

}
