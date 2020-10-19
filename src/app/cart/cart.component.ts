import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { cartproductremove, getcart, updatequantity } from '../actions';
import { Istore } from '../reducer';
import { StoresserviceService } from '../storesservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  stores: Observable<Istore>;
  storeobject;
  objectid;
  total = 0;
  realid;
  product = {}
  productid;
  tempcart = {}
  constructor(private store: Store<{ stores: Istore }>, private router: Router, private activatedroute: ActivatedRoute, private StoresServiceService: StoresserviceService) {
    this.stores = store.pipe(select('stores'));

  }
  getproduct(id) {
    this.StoresServiceService.getproduct(id).subscribe((res: any) => {
      return res.doc

    });
  }
  quantity = new FormGroup({

    quantity: new FormControl('', Validators.required)
  });
  delete(id) {
    this.store.subscribe((store: any) => {
      this.storeobject = store.stores.cart[id];
      this.objectid = store.stores.cart[id].id;
      this.realid = this.objectid;

    })
    let userid = localStorage.getItem("userid")
    this.realid = this.objectid;

    this.StoresServiceService.deleteproduct(this.realid, userid).subscribe(res => {



    });
    this.store.dispatch(new cartproductremove(id));
    this.store.subscribe((store: any) => {
      this.total = 0;
      for (let i = 0; i < store.stores.cart.length; i++) {

        this.total = this.total + (store.stores.cart[i].price * store.stores.cart[i].quantity);
      }
      if (store.stores.cart[0]) {
      }
    })
  }
  increment(id) {

    this.store.subscribe((store: any) => {
      this.tempcart = {
        id: store.stores.cart[id].id,
        name: store.stores.cart[id].name,
        quantity: store.stores.cart[id].quantity + 1,

        price: store.stores.cart[id].price
      }

      this.productid = {
        productId: store.stores.cart[id].id,
        quantity: store.stores.cart[id].quantity + 1
      }



    })
    let userid = localStorage.getItem("userid")
    this.StoresServiceService.addtocart(this.productid, userid).subscribe(res => {
    });
    this.store.dispatch(new updatequantity(id, this.tempcart));
    this.store.subscribe((store: any) => {
      this.total = 0;

      for (let i = 0; i < store.stores.cart.length; i++) {
        this.total = this.total + (store.stores.cart[i].price * store.stores.cart[i].quantity);
      }
      if (store.stores.cart[0]) {
      }
    })
  }

  decrement(id) {
    this.store.subscribe((store: any) => {

      this.tempcart = {
        id: store.stores.cart[id].id,
        name: store.stores.cart[id].name,
        quantity: store.stores.cart[id].quantity - 1,

        price: store.stores.cart[id].price
      }
      this.productid = {
        productId: store.stores.cart[id].id,
        quantity: store.stores.cart[id].quantity - 1
      }



    })
    let userid = localStorage.getItem("userid")
    this.StoresServiceService.addtocart(this.productid, userid).subscribe(res => {
    });
    this.store.dispatch(new updatequantity(id, this.tempcart));
    this.store.subscribe((store: any) => {
      this.total = 0;

      for (let i = 0; i < store.stores.cart.length; i++) {
        this.total = this.total + (store.stores.cart[i].price * store.stores.cart[i].quantity);
      }
      if (store.stores.cart[0]) {
      }

    })

  }
  ngOnInit(): void {
    this.store.dispatch(new getcart());
    const id = localStorage.getItem('userid')

    this.store.subscribe((store: any) => {
      this.total = 0;

      for (let i = 0; i < store.stores.cart.length; i++) {
        this.total = this.total + (store.stores.cart[i].price * store.stores.cart[i].quantity);
      }
      if (store.stores.cart[0]) {

      }
    })
  }

}
