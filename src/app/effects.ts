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
    constructor(
        private actions$: Actions,
        private StoresserviceService: StoresserviceService,
        private activatedroute: ActivatedRoute, private store: Store<{ stores: Istore }>
    ) {

    }

    @Effect()
    loadStores$ = this.actions$.pipe(
        ofType(StoresActionTypes.getstores),
        mergeMap(() =>
            this.StoresserviceService.getstores().pipe(
                map(Stores => {
                    console.log("in effects");

                    return { type: StoresActionTypes.Loadstores, payload: Stores };
                }),
                catchError(() => EMPTY)
            )
        )
    );
    @Effect()
    loadProducts$ = this.actions$.pipe(
        ofType(StoresActionTypes.getproducts),
        mergeMap(() =>
            this.StoresserviceService.getproducts().pipe(
                map(Products => {
                    console.log("in effects");

                    return { type: StoresActionTypes.Loadproducts, payload: Products };
                }),
                catchError(() => EMPTY)
            )
        )
    );
}