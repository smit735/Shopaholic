import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Stores } from "../stores";
import { StoresRemove } from "../actions";
@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  stores: Observable<Stores[]>;
  constructor(private store: Store<{ stores: Stores[] }>) {
    this.stores = store.pipe(select('stores'));
  }
  removeStore(customerIndex) {
    this.store.dispatch(new StoresRemove(customerIndex));
  }
  ngOnInit(): void {
  }

}
