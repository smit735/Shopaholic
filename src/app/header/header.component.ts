import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  urlid
  user = {
    name: '',
    addr: '',
    email: ''

  }
  usersession
  userid
  constructor(private router: Router, private activatedroute: ActivatedRoute) { }
  logout() {
    localStorage.removeItem("SessionUser");
    localStorage.removeItem("usersession");
    localStorage.removeItem("username");

    localStorage.removeItem("useremailname");
    localStorage.removeItem("addr");



    localStorage.removeItem("user");

    this.router.navigate(['login'])

  }
  navigate() {
    if (localStorage.getItem("usersession")) {
      this.router.navigate(['/userstores'])
    }
    if (localStorage.getItem("SessionUser")) {
      this.router.navigate(['/admin/dashboard'])
    }

  }
  account() {
    this.user.name = localStorage.getItem("username")
    this.user.email = localStorage.getItem("useremailname")
    // this.usersession = localStorage.getItem("")
    this.user.addr = localStorage.getItem("addr")
  }
  stores() {
    if (localStorage.getItem("usersession")) {
      this.router.navigate(['/userstores'])
    }
    if (localStorage.getItem("SessionUser")) {
      this.router.navigate(['/admin/dashboard/stores'])
    }
  }
  cart() {
    this.router.navigate(['dashboard/userstores/userproducts/cart'])

  }

  ngOnInit(): void {
    let id = parseInt(this.activatedroute.snapshot.paramMap.get('id'));
    this.urlid = id;
    this.user.name = localStorage.getItem("username")
    this.user.email = localStorage.getItem("useremailname")
    // this.usersession = localStorage.getItem("")
    this.user.addr = localStorage.getItem("addr")
    if (localStorage.getItem("usersession")) {
      this.usersession = 1
    }



  }
  reset() {
    this.userid = localStorage.getItem("userid")
    this.router.navigate(['resetpassword/' + this.userid])
  }

}
