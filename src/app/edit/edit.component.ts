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
  category: category[] = [
    { value: 'Electronic', viewValue: 'Electronic' },
    { value: 'Groceries', viewValue: 'Groceries' },
    { value: 'Fashion', viewValue: 'Fashion' }
  ];
  stores: Observable<Stores[]>;
  constructor(private router: Router, private fb: FormBuilder, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private store: Store<{ stores: Stores[] }>, private route: ActivatedRoute) {
    this.stores = store.pipe(select('stores'));

  }
  editstore = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  });


  onSubmit() {
    if (this.editstore.valid) {
      this.store.dispatch(new StoresEdit(this.urlid, this.editstore.value,));
      console.log(this.store);

      this.router.navigate(['/admin/stores']);
    }
    else {
      alert("Form is invalid")
    }

  }
  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.urlid = id;
    this.store.subscribe((store: any) => {
      this.storeobject = store.stores[this.urlid];
      console.log(this.storeobject);

    })
    this.editstore.setValue({
      name: this.storeobject.name,
      address: this.storeobject.address,
      category: this.storeobject.category
    });

  }

}
