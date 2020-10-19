import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StoresserviceService } from '../storesservice.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  constructor(private toastr: ToastrService, private StoresServiceService: StoresserviceService) { }
  myForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.mailformat)])


  });
  forgotpassword() {
    if (this.myForm.valid) {
      this.StoresServiceService.forgotpassword(this.myForm.value).subscribe(res => {


      });
      this.showSuccess();
    }
  }
  showSuccess() {
    this.toastr.success('email has been sent');
  }
  ngOnInit(): void {
  }

}
