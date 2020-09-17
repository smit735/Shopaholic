import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Login } from "../login";
import { Router } from '@angular/router';
import { AuthguardserviceService } from "../authguardservice.service";
import { MapsAPILoader } from '@agm/core';
import { Stores } from "../stores";
import { select, Store } from '@ngrx/store';
import { ProductEdit } from "../productaction";

import { Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { Istore } from '../reducer';
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
  constructor(private router: Router, private fb: FormBuilder, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private store: Store<{ stores: Istore }>, private route: ActivatedRoute) {
    this.stores = store.pipe(select('stores'));

  }
  editproduct = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),

  });


  onSubmit() {
    if (this.editproduct.valid) {
      this.store.dispatch(new ProductEdit(this.urlid, this.editproduct.value,));
      console.log(this.store);

      this.router.navigate(['/admin/stores/' + this.urlid + '/products']);
    }
    else {
      alert("Form is invalid")
    }

  }
  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.urlid = id;
    this.store.subscribe((store: any) => {
      console.log(store.stores.products);
      this.storeobject = store.stores.products[this.urlid];


    })
    this.editproduct.setValue({
      name: this.storeobject.name,
      image: this.storeobject.image,
      category: this.storeobject.category,
      price: this.storeobject.price
    });

  }

}
