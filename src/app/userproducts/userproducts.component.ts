import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getproducts, searchproducts } from '../actions';
import { Istore } from '../reducer';
import { StoresserviceService } from '../storesservice.service';
import { ToastrService } from 'ngx-toastr';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-userproducts',
  templateUrl: './userproducts.component.html',
  styleUrls: ['./userproducts.component.css']
})
export class UserproductsComponent implements OnInit {

  urlid; objectid; realstoreid
  stores: Observable<Istore>;
  storeobject: any;
  productid: any;
  realid;
  constructor(private store: Store<{ stores: Istore }>, private router: Router, private activatedroute: ActivatedRoute, private StoresServiceService: StoresserviceService, private toastr: ToastrService) {
    this.stores = store.pipe(select('stores'));

  }
  addtocart(id) {
    this.store.subscribe((store: any) => {
      this.productid = {
        productId: store.stores.products[id]._id,
        quantity: 1
      }


      // this.storeobject = store.stores.products[id];
      // this.objectid = store.stores.products[id]._id;


    })
    let userid = localStorage.getItem("userid")

    // this.router.navigate(['dashboard/userstores/' + this.urlid + '/userproducts/cart/'])
    this.StoresServiceService.addtocart(this.productid, userid).subscribe(res => {
      this.showSuccess();

    });
  }
  showSuccess() {
    this.toastr.success('added to cart successfully');
  }
  search = new FormGroup({
    term: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),

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
