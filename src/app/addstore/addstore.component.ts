import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Login } from "../login";
import { Router } from '@angular/router';
import { AuthguardserviceService } from "../authguardservice.service";
import { MapsAPILoader } from '@agm/core';
import { Stores } from "../stores";
import { select, Store } from '@ngrx/store';
import { StoresAdd } from "../actions";

import { Observable } from 'rxjs';

interface category {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-addstore',
  templateUrl: './addstore.component.html',
  styleUrls: ['./addstore.component.css']
})

export class AddstoreComponent implements OnInit {
  // latitude: number;
  // longitude: number;
  // zoom: number;
  // address: string;
  // private geoCoder;
  // login: Login;
  // @ViewChild('search')
  // public searchElementRef: ElementRef;
  category: category[] = [
    { value: 'Electronic', viewValue: 'Electronic' },
    { value: 'Groceries', viewValue: 'Groceries' },
    { value: 'Fashion', viewValue: 'Fashion' }
  ];
  stores: Observable<Stores[]>;
  constructor(private router: Router, private fb: FormBuilder, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private store: Store<{ stores: Stores[] }>) {
    this.stores = store.pipe(select('stores'));

  }
  addstore = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  });
  ngOnInit() {



  }

  onSubmit() {
    if (this.addstore.valid) {
      this.store.dispatch(new StoresAdd(this.addstore.value));
      console.log(this.store);

      this.router.navigate(['/admin/stores']);
    }
    else {
      alert("Form is invalid")
    }

  }
}
