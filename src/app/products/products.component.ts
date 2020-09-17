import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store, State } from '@ngrx/store';
import { Stores } from "../stores";
import { ProductRemove } from "../actions";

import { Router, ActivatedRoute } from "@angular/router";
import { Istore } from '../reducer';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  urlid
  stores: Observable<Istore>;
  constructor(private store: Store<{ stores: Istore }>, private router: Router, private activatedroute: ActivatedRoute) {
    this.stores = store.pipe(select('stores'));
    console.log(this.stores);

  }

  removeStore(id) {
    console.log(id);

    this.store.dispatch(new ProductRemove(id));
  }
  editStore(id) {



    this.router.navigate(['admin/stores/' + this.urlid + '/products/' + id + '/edit']);
  }
  ngOnInit(): void {
    let id = parseInt(this.activatedroute.snapshot.paramMap.get('id'));
    this.urlid = id;
    this.store.subscribe((store: any) => {
      console.log(store.stores);

    })
  }

}
