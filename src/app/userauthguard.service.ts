import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserauthguardService {

  constructor() { }
  gettoken() {
    return !!localStorage.getItem("usersession");
  }
}
