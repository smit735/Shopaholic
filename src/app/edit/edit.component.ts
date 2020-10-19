import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Login } from "../login";
import { Router } from '@angular/router';
import { AuthguardserviceService } from "../authguardservice.service";
import { MapsAPILoader } from '@agm/core';
import { Stores } from "../stores";
import { select, Store } from '@ngrx/store';
import { StoresAdd, StoresEdit } from "../actions";

import { Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { Istore } from '../reducer';
import { StoresserviceService } from "../storesservice.service";

interface category {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public urlid;
  storeobject;
  objectid;
  realid
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
  editstore = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    addr: new FormControl('', Validators.required),
    cat: new FormControl('', Validators.required)
  });


  onSubmit() {
    if (this.editstore.valid) {
      this.store.subscribe((store: any) => {
        this.storeobject = store.stores.data[this.urlid];
        this.objectid = store.stores.data[this.urlid]._id;


      })
      this.realid = this.objectid;
      this.StoresServiceService.editstores(this.editstore.value, this.realid).subscribe(res => {



      });
      this.store.dispatch(new StoresEdit(this.urlid, this.editstore.value,));


      this.router.navigate(['/admin/dashboard/stores']);
    }
    else {
      alert("Form is invalid")
    }

  }
  ngOnInit(): void {

    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.urlid = id;
    this.store.subscribe((store: any) => {
      this.storeobject = store.stores.data[this.urlid];
      this.objectid = store.stores.data[this.urlid]._id;


    })
    this.realid = this.objectid;

    this.editstore.setValue({
      name: this.storeobject.name,
      addr: this.storeobject.addr,
      cat: this.storeobject.cat
    });

  }

}
