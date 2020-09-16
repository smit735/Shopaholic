import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store, State } from '@ngrx/store';
import { Stores } from "../stores";
import { ProductRemove } from "../productaction";

import { Router } from "@angular/router";
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  stores: Observable<Stores[]>;
  constructor(private store: Store<{ stores: Stores[] }>, private router: Router, private state: State<Stores>) {
    this.stores = store.pipe(select('stores'));
    console.log(this.stores);

  }

  removeStore(ProductIndex) {
    this.store.dispatch(new ProductRemove(ProductIndex));
  }
  editStore(id) {



    this.router.navigate(['admin/stores/' + id + '/products/edit']);
  }
  ngOnInit(): void {
    this.store.subscribe((store: any) => {
      console.log(store.stores);

    })
  }

}
