import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { StoresActionTypes } from './actions';
import { Stores } from './stores';
import { StoresserviceService } from './storesservice.service';
import { select, Store, State } from '@ngrx/store';
import { Istore } from './reducer';

@Injectable()
export class ShopEffects {
    id;
    stores: Observable<Istore>;
    objectid: any;
    realid: any;
    term: string;
    cat: string;
    constructor(
        private actions$: Actions,
        private StoresserviceService: StoresserviceService,
        private activatedroute: ActivatedRoute, private store: Store<{ stores: Istore }>
    ) {


    }

    @Effect()
    loadStores$ = this.actions$.pipe(
        ofType(StoresActionTypes.getstores),
        mergeMap(() => {

            let pagenumber = localStorage.getItem("pagenumber")
            return this.StoresserviceService.getstores(pagenumber).pipe(
                map(Stores => {


                    return { type: StoresActionTypes.Loadstores, payload: Stores };
                }),
                catchError(() => EMPTY)
            )
        }
        )
    );
    @Effect()
    loaduserStores$ = this.actions$.pipe(
        ofType(StoresActionTypes.getuserstores),
        mergeMap(() => {

            return this.StoresserviceService.getuserstores().pipe(
                map(Stores => {


                    return { type: StoresActionTypes.loaduserstores, payload: Stores };
                }),
                catchError(() => EMPTY)
            )
        }
        )
    );
    @Effect()
    loaddashboard$ = this.actions$.pipe(
        ofType(StoresActionTypes.getdashboard),
        mergeMap(() => {

            return this.StoresserviceService.getdashboard().pipe(
                map(dashboard => {


                    return { type: StoresActionTypes.Loaddashboard, payload: dashboard };
                }),
                catchError(() => EMPTY)
            )
        }
        )
    );
    @Effect()
    loadProducts$ = this.actions$.pipe(
        ofType(StoresActionTypes.getproducts),
        mergeMap(() => {
            this.objectid = localStorage.getItem("storeid")

            return this.StoresserviceService.getproducts(this.objectid).pipe(
                map(Products => {


                    return { type: StoresActionTypes.Loadproducts, payload: Products };
                }),
                catchError(() => EMPTY)
            )
        }
        )

    );
    @Effect()
    loadsearchProducts$ = this.actions$.pipe(
        ofType(StoresActionTypes.searchproducts),
        mergeMap(() => {
            this.objectid = localStorage.getItem("storeid")
            this.term = localStorage.getItem("term")


            return this.StoresserviceService.searchproducts(this.objectid, this.term).pipe(
                map(Products => {



                    return { type: StoresActionTypes.loadsearchproducts, payload: Products };
                }),
                catchError(() => EMPTY)
            )
        }
        )

    );
    @Effect()
    loadfilterProducts$ = this.actions$.pipe(
        ofType(StoresActionTypes.getfilterstores),
        mergeMap(() => {

            this.cat = localStorage.getItem("cat")

            return this.StoresserviceService.filterstores(this.cat).pipe(
                map(stores => {



                    return { type: StoresActionTypes.loadfilterstores, payload: stores };
                }),
                catchError(() => EMPTY)
            )
        }
        )

    );
    @Effect()
    loadcart$ = this.actions$.pipe(
        ofType(StoresActionTypes.getcart),
        mergeMap(() => {
            this.realid = localStorage.getItem("userid")

            return this.StoresserviceService.getcart(this.realid).pipe(
                map(cart => {

                    return { type: StoresActionTypes.Loadcart, payload: cart };
                }),
                catchError(() => EMPTY)
            )
        }
        )
    );
}