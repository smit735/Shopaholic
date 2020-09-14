import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthguardserviceService {

  gettoken() {
    return !!localStorage.getItem("SessionUser");
  }
  constructor() { }
}
