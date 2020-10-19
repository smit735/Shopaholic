import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Login } from "../login";
import { Router } from '@angular/router';
import { AuthguardserviceService } from "../authguardservice.service";
import { MapsAPILoader } from '@agm/core';
import { Stores } from "../stores";
import { select, Store } from '@ngrx/store';
import { getstores, StoresAdd } from "../actions";
import { StoresserviceService } from "../storesservice.service";
import { Observable } from 'rxjs';

export interface category {
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
    private ngZone: NgZone, private store: Store<{ stores: Stores[] }>, private StoresServiceService: StoresserviceService) {
    this.stores = store.pipe(select('stores'));

  }
  addstore = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    addr: new FormControl('', Validators.required),
    cat: new FormControl('', Validators.required)
  });
  ngOnInit() {



  }

  onSubmit() {
    if (this.addstore.valid) {
      Object.assign(this.addstore.value, { id: Math.floor(Math.random() * 100) });

      this.store.dispatch(new StoresAdd(this.addstore.value));

      this.StoresServiceService.addstores(this.addstore.value).subscribe(res => {

      });
      this.store.dispatch(new getstores());

      this.router.navigate(['/admin/dashboard/stores']);
    }
    else {
      alert("Form is invalid")
    }

  }
}
