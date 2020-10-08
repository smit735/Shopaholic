import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store, State } from '@ngrx/store';
import { Stores } from "../stores";
import { getstores, StoresRemove } from "../actions";
import { Router } from "@angular/router";
import { Istore } from '../reducer';
import { StoresserviceService } from "../storesservice.service";
@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  i; j; storeid; count;
  stores: Observable<Istore>;
  urlid: any;
  storeobject: any;
  objectid: any;
  realid: any;
  constructor(private store: Store<{ stores: Istore }>, private router: Router, private state: State<Stores>, private StoresServiceService: StoresserviceService) {
    this.stores = this.store.pipe(select('stores'));
    console.log(this.stores);

  }
  products(id) {
    this.router.navigate(['admin/stores/' + id + '/products']);
  }
  removeStore(StoreIndex) {
    this.store.subscribe((store: any) => {
      console.log(store.stores.data[StoreIndex]);
      this.storeobject = store.stores.data[StoreIndex];
      this.objectid = store.stores.data[StoreIndex]._id;
      console.log(this.objectid);


    })
    this.realid = this.objectid;
    this.StoresServiceService.deletestores(this.realid).subscribe(res => {
      console.log(res);



    });
    this.store.dispatch(new StoresRemove(StoreIndex));
  }
  editStore(id) {



    this.router.navigate(['admin/stores', id]);
  }
  ngOnInit(): void {
    this.store.dispatch(new getstores());
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
