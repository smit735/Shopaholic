import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Login } from "../login";
import { Router } from '@angular/router';
import { AuthguardserviceService } from "../authguardservice.service";
import { MapsAPILoader } from '@agm/core';
import { Stores } from "../stores";
import { select, Store } from '@ngrx/store';
import { ProductEdit } from "../productaction";
import { StoresserviceService } from "../storesservice.service";

import { Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { Istore } from '../reducer';
import { getstores } from '../actions';
interface category {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  public urlid;
  storeobject;
  category: category[] = [
    { value: 'Electronic', viewValue: 'Electronic' },
    { value: 'Groceries', viewValue: 'Groceries' },
    { value: 'Fashion', viewValue: 'Fashion' }
  ];
  stores: Observable<Istore>;
  objectid: any;
  realid: any;
  strid;
  constructor(private router: Router, private fb: FormBuilder, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private store: Store<{ stores: Istore }>, private route: ActivatedRoute, private StoresServiceService: StoresserviceService) {
    this.stores = store.pipe(select('stores'));

  }
  editproduct = new FormGroup({
    name: new FormControl('', [Validators.required]),
    img: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),

  });


  onSubmit() {
    if (this.editproduct.valid) {
      this.store.subscribe((store: any) => {
        this.storeobject = store.stores.products[this.urlid];
        this.objectid = store.stores.products[this.urlid]._id;


      })
      this.realid = this.objectid;
      this.StoresServiceService.editproducts(this.editproduct.value, this.realid).subscribe(res => {



      });
      this.store.dispatch(new ProductEdit(this.urlid, this.editproduct.value,));

      this.router.navigate(['/admin/dashboard/stores/' + this.strid + '/products']);
    }
    else {
      alert("Form is invalid")
    }

  }
  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.strid = parseInt(this.route.snapshot.paramMap.get('urlid'));
    this.urlid = id;
    this.store.subscribe((store: any) => {
      this.storeobject = store.stores.products[this.urlid];


    })
    this.editproduct.setValue({
      name: this.storeobject.name,
      img: this.storeobject.img,
      price: this.storeobject.price
    });

  }

}
