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
  urlid
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
  addproduct = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),

  });
  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.urlid = id;


  }

  onSubmit() {
    if (this.addproduct.valid) {
      this.store.dispatch(new ProductAdd(this.urlid, this.addproduct.value));

      this.router.navigate(['admin/stores/' + this.urlid + '/products']);
    }
    else {
      alert("Form is invalid")
    }

  }
}
