import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store, State } from '@ngrx/store';
import { Stores } from "../stores";
import { getproducts, ProductRemove, searchproducts } from "../actions";

import { Router, ActivatedRoute } from "@angular/router";
import { Istore } from '../reducer';
import { StoresserviceService } from "../storesservice.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  urlid
  stores: Observable<Istore>;
  storeobject: any;
  realid
  realstoreid
  objectid
  constructor(private store: Store<{ stores: Istore }>, private router: Router, private activatedroute: ActivatedRoute, private StoresServiceService: StoresserviceService) {
    this.stores = store.pipe(select('stores'));

  }

  removeStore(id) {
    this.store.subscribe((store: any) => {
      this.storeobject = store.stores.products[id];
      this.objectid = store.stores.products[id]._id;


    })
    this.realid = this.objectid;
    this.StoresServiceService.deleteproducts(this.realid).subscribe(res => {



    });

    this.store.dispatch(new ProductRemove(id));
  }

  editStore(id) {



    this.router.navigate(['admin/dashboard/stores/' + this.urlid + '/products/' + id + '/edit']);
  }
  search = new FormGroup({
    term: new FormControl('', Validators.maxLength(20)),

  });

  ngOnInit(): void {

    let id = parseInt(this.activatedroute.snapshot.paramMap.get('id'));
    this.urlid = id;
    this.store.subscribe((store: any) => {
      this.storeobject = store.stores.data[id];
      this.objectid = store.stores.data[id]._id;
      localStorage.removeItem("storeid")
      localStorage.setItem('storeid', this.objectid)

    })
    this.realstoreid = this.objectid;
    this.store.dispatch(new getproducts());
    this.search.get("term").valueChanges.subscribe(x => {

      localStorage.setItem("term", x)
      this.store.dispatch(new searchproducts());
    })


  }

}
