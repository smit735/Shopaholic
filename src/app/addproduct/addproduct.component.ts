import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Login } from "../login";
import { Router, ActivatedRoute } from '@angular/router';
import { AuthguardserviceService } from "../authguardservice.service";
import { MapsAPILoader } from '@agm/core';
import { Stores } from "../stores";
import { select, Store } from '@ngrx/store';
import { ProductAdd } from "../actions";
import { Observable } from 'rxjs';
import { Istore } from '../reducer';
import { StoresserviceService } from "../storesservice.service";

interface category {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  urlid;
  storeid;
  category: category[] = [
    { value: 'Electronic', viewValue: 'Electronic' },
    { value: 'Groceries', viewValue: 'Groceries' },
    { value: 'Fashion', viewValue: 'Fashion' }
  ];
  stores: Observable<Istore>;
  constructor(private router: Router, private fb: FormBuilder, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private store: Store<{ stores: Istore }>, private route: ActivatedRoute, private StoresServiceService: StoresserviceService) {
    this.stores = store.pipe(select('stores'));

  }
  addproduct = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    img: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),

  });
  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.urlid = id;
    console.log(this.urlid);

    this.store.subscribe((store: any) => {
      console.log(store.stores.data[this.urlid]);
      this.storeid = store.stores.data[this.urlid]._id;
      console.log(this.storeid);


    })


  }

  onSubmit() {
    if (this.addproduct.valid) {
      const payload = Object.assign(this.addproduct.value, { strid: this.storeid });
      console.log(payload);

      this.store.subscribe((store: any) => {
        console.log(store.stores.data[this.urlid]);
        this.storeid = store.stores.data[this.urlid].id;
        console.log(this.storeid);



      })
      this.store.dispatch(new ProductAdd(this.addproduct.value));
      this.StoresServiceService.addproduct(payload).subscribe(res => {
        console.log(res);


      });
      this.router.navigate(['admin/stores/' + this.urlid + '/products']);
    }
    else {
      alert("Form is invalid")
    }

  }
}
