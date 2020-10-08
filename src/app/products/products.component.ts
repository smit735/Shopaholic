import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store, State } from '@ngrx/store';
import { Stores } from "../stores";
import { getproducts, ProductRemove } from "../actions";

import { Router, ActivatedRoute } from "@angular/router";
import { Istore } from '../reducer';
import { StoresserviceService } from "../storesservice.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  urlid
  stores: Observable<Istore>;
  storeobject: any;
  realid: (objectid: any) => void;
  constructor(private store: Store<{ stores: Istore }>, private router: Router, private activatedroute: ActivatedRoute, private StoresServiceService: StoresserviceService) {
    this.stores = store.pipe(select('stores'));
    console.log(this.stores);

  }

  removeStore(id) {
    console.log(id);
    this.store.subscribe((store: any) => {
      console.log(store.stores.products[id]);
      this.storeobject = store.stores.products[id];
      this.objectid = store.stores.products[id]._id;
      console.log(this.objectid);


    })
    this.realid = this.objectid;
    this.StoresServiceService.deleteproducts(this.realid).subscribe(res => {
      console.log(res);



    });

    this.store.dispatch(new ProductRemove(id));
  }
  objectid(objectid: any) {
    throw new Error('Method not implemented.');
  }
  editStore(id) {



    this.router.navigate(['admin/stores/' + this.urlid + '/products/' + id + '/edit']);
  }
  ngOnInit(): void {
    this.store.dispatch(new getproducts());
    let id = parseInt(this.activatedroute.snapshot.paramMap.get('id'));
    this.urlid = id;
    this.store.subscribe((store: any) => {
      console.log(store.stores);

    })
  }

}
