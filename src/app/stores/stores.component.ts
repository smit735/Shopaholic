import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store, State } from '@ngrx/store';
import { Stores } from "../stores";
import { StoresRemove } from "../actions";
import { getstate, StoresReducer } from "../reducer";
import { Router } from "@angular/router";
@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  stores: Observable<Stores[]>;
  constructor(private store: Store<{ stores: Stores[] }>, private router: Router, private state: State<Stores>) {
    this.stores = store.pipe(select('stores'));
    console.log(this.stores);

  }
  removeStore(StoreIndex) {
    this.store.dispatch(new StoresRemove(StoreIndex));
  }
  editStore(id) {



    this.router.navigate(['admin/stores', id]);
  }
  ngOnInit(): void {
  }

}
