import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { Stores } from "../stores";
import { Products } from "../products";
import { StoresReducer } from "../reducer";
import { ProductReducer } from "../productreducer";
import { environment } from '../../environments/environment';


export interface State {
  // stores: Stores;
  // products: Products;
}

export const reducers: ActionReducerMap<State> = {

};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
