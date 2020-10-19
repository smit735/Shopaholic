import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserauthguardService } from './userauthguard.service';

@Injectable({
  providedIn: 'root'
})
export class UserauthguardGuard implements CanActivate {
  constructor(public Authguardservice: UserauthguardService, public router: Router) { }
  canActivate(): boolean {
    if (!this.Authguardservice.gettoken()) {
      this.router.navigateByUrl("login");
    }
    return this.Authguardservice.gettoken();
  }
}


