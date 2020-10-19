import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { select, Store, State } from '@ngrx/store';
import { Stores } from "../stores";
import { emptystores, getfilterstores, getstores, getuserstores, StoresRemove } from "../actions";
import { Router } from "@angular/router";
import { Istore } from '../reducer';
import { StoresserviceService } from "../storesservice.service";
import { CdkVirtualScrollViewport, ScrollDispatcher } from "@angular/cdk/scrolling";
import { map, tap, scan, mergeMap, throttleTime, filter } from 'rxjs/operators';
import { category } from '../addstore/addstore.component';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit, AfterViewInit {
  i; j; storeid; count;
  stores: Observable<Istore>;
  urlid: any;
  storeobject: any;
  objectid: any;
  realid: any;
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;
  searchPageNumber: number;
  searchResults: Array<any>;
  pagesize = 15;
  totalstores;
  result = [];
  category: category[] = [
    { value: 'Electronic', viewValue: 'Electronic' },
    { value: 'Groceries', viewValue: 'Groceries' },
    { value: 'Fashion', viewValue: 'Fashion' }
  ];
  constructor(private store: Store<{ stores: Istore }>, private router: Router, private state: State<Stores>, private StoresServiceService: StoresserviceService, private scrollDispatcher: ScrollDispatcher, private cd: ChangeDetectorRef, private zone: NgZone) {
    this.stores = this.store.pipe(select('stores'));
    this.searchPageNumber = 0;
    this.searchResults = [];
  }

  products(id) {
    this.router.navigate(['admin/dashboard/stores/' + id + '/products']);
  }
  removeStore(StoreIndex) {
    this.store.subscribe((store: any) => {
      this.storeobject = store.stores.data[StoreIndex];
      this.objectid = store.stores.data[StoreIndex]._id;


    })
    this.realid = this.objectid;
    this.StoresServiceService.deletestores(this.realid).subscribe(res => {



    });
    this.store.dispatch(new StoresRemove(StoreIndex));
  }
  editStore(id) {



    this.router.navigate(['admin/dashboard/stores/' + id]);
  }
  ngAfterViewInit(): void {


    this.scrollDispatcher.scrolled().pipe(
      filter(event => this.viewport.getRenderedRange().end === this.viewport.getDataLength())
    ).subscribe(event => {
      if (this.result.length < this.totalstores) {

        this.searchPageNumber++;

        this.nextSearchPage(this.searchPageNumber);
      }
    })



  }
  getResults(pageNumber) {


    localStorage.setItem("pagenumber", pageNumber)
    this.store.subscribe((store: any) => {
      this.totalstores = store.stores.dashboard[0].stores;
    })
    this.result.push(this.store.dispatch(new getstores()));

    return of(this.result);
  }
  nextSearchPage(pageNumber: number): void {

    this.getResults(pageNumber).subscribe((pagedResults) => {
      this.zone.run(() => {
        setTimeout(() => {

          // if (this.result.length < ) {
          //   this.searchResults = this.searchResults.concat(pagedResults);

          // }

        }, 200);  //mimic API time delay

      });

    });
  }
  ngOnInit(): void {
    localStorage.setItem("pagenumber", "0")
    this.store.dispatch(new emptystores());
    this.store.dispatch(new getstores());
    this.stores = this.store.select('stores');
    this.store.subscribe((store: any) => {
      this.totalstores = store.stores.dashboard[0].stores;
    })

  }
  productcount(i) {
    this.count = 0;
    this.store.subscribe((store: any) => {
      for (let j = 0; j < store.stores.products.length; j++) {
        if (store.stores.data[i].id == store.stores.products[j].id) {
          this.count++;

        }

      }



    })
    return this.count;
  }
  filter(cat) {
    localStorage.setItem("cat", cat)
    this.store.dispatch(new getfilterstores());

  }
  removefilter() {
    localStorage.setItem("pagenumber", "0")
    this.store.dispatch(new emptystores());
    this.store.dispatch(new getstores());

  }

}
