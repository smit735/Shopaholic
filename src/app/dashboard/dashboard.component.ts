import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getdashboard } from '../actions';
import { Istore } from '../reducer';
import { StoresserviceService } from '../storesservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stores: Observable<Istore>;

  constructor(private store: Store<{ stores: Istore }>, private router: Router, private activatedroute: ActivatedRoute, private StoresServiceService: StoresserviceService) {
    this.stores = store.pipe(select('stores'));

  }
  ngOnInit(): void {
    this.store.dispatch(new getdashboard());

  }

}
