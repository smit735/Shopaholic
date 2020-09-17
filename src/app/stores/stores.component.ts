import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store, State } from '@ngrx/store';
import { Stores } from "../stores";
import { StoresRemove } from "../actions";
import { Router } from "@angular/router";
import { Istore } from '../reducer';
@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  i; j; storeid; count;
  stores: Observable<Istore>;
  constructor(private store: Store<{ stores: Istore }>, private router: Router, private state: State<Stores>) {
    this.stores = this.store.pipe(select('stores'));
    console.log(this.stores);

  }
  products(id) {
    this.router.navigate(['admin/stores/' + id + '/products']);
  }
  removeStore(StoreIndex) {
    this.store.dispatch(new StoresRemove(StoreIndex));
  }
  editStore(id) {



    this.router.navigate(['admin/stores', id]);
  }
  ngOnInit(): void {
    this.stores = this.store.select('stores');
    console.log(this.store);

  }
  productcount(i) {
    this.count = 0;
    this.store.subscribe((store: any) => {
      for (let j = 0; j < store.stores.products.length; j++) {
        if (store.stores.data[i].id == store.stores.products[j].id) {
          this.count++;

        }

      }
      console.log(store.stores.data[i].id);



    })
    return this.count;
  }

}
