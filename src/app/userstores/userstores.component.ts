import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State, Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { emptystores, getfilterstores, getstores, getuserstores } from '../actions';
import { category } from '../addstore/addstore.component';
import { Istore } from '../reducer';
import { Stores } from '../stores';
import { StoresserviceService } from '../storesservice.service';

@Component({
  selector: 'app-userstores',
  templateUrl: './userstores.component.html',
  styleUrls: ['./userstores.component.css']
})
export class UserstoresComponent implements OnInit {
  i; j; storeid; count;
  stores: Observable<Istore>;
  urlid: any;
  storeobject: any;
  objectid: any;
  realid: any;
  category: category[] = [
    { value: 'Electronic', viewValue: 'Electronic' },
    { value: 'Groceries', viewValue: 'Groceries' },
    { value: 'Fashion', viewValue: 'Fashion' }
  ];
  constructor(private store: Store<{ stores: Istore }>, private router: Router, private state: State<Stores>, private StoresServiceService: StoresserviceService) {
    this.stores = this.store.pipe(select('stores'));

  }
  products(id) {
    this.router.navigate(['dashboard/userstores/' + id + '/userproducts']);
  }
  filter(cat) {
    localStorage.setItem("cat", cat)
    this.store.dispatch(new getfilterstores());

  }
  removefilter() {
    this.store.dispatch(new getuserstores());

  }
  ngOnInit(): void {
    localStorage.setItem("pagenumber", "0")
    localStorage.removeItem("cat")
    // this.store.dispatch(new emptystores());

    this.store.dispatch(new getuserstores());
    this.stores = this.store.select('stores');

  }

}
