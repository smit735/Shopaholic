import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StoresserviceService } from '../storesservice.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  userid
  constructor(private router: Router, private toastr: ToastrService, private StoresServiceService: StoresserviceService) { }
  myForm = new FormGroup({
    pass: new FormControl('', [Validators.required])


  });
  reset() {
    if (this.myForm.valid) {
      this.userid = localStorage.getItem("userid")
      this.StoresServiceService.reset(this.myForm.value, this.userid).subscribe(res => {


      });
      this.showSuccess();
      this.router.navigate(['/userstores'])

    }
  }
  showSuccess() {
    this.toastr.success('reset password done');
  }
  ngOnInit(): void {
  }

}
