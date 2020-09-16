
import { state } from '@angular/animations';
import { Stores } from "./stores";
import { Products } from "./products";
import { ActionEx, StoresActionTypes, ProductActionTypes, storeaction } from './actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
export interface products {
    name: string;
    image: string;
    category: string;
    prize: string;
}

export interface Istore {
    data: Array<Stores>;

}

export const initialState: Istore = {
    data: [],


}

export function StoresReducer(state: Istore = initialState, action: storeaction) {



    switch (action.type) {
        case StoresActionTypes.Add:
            console.log(state.data);
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        case StoresActionTypes.Remove:
            const deleted = state.data;
            deleted.splice(action.payload, 1);
            return { ...state, data: deleted };
        case StoresActionTypes.edit:

        // return [...state.slice(0, action.payload.id), action.payload, ...state.slice(action.payload.id + 1,)]
        // case ProductActionTypes.Add:
        //     console.log(state);
        //     this.store.subscribe((store: any) => {
        //         console.log();
        //         store.stores[action.payload.id].Products = [...store.stores[action.payload.id].Products, action.payload]
        //         storevalue = store.stores[action.payload.id].Products;
        //     })
        //     const temp = []
        //     return [...state.slice(0, action.payload.id), storevalue, ...state.slice(action.payload.id + 1,)]
        // case ProductActionTypes.Remove:
        //     return [
        //         ...state.slice(0, action.payload),
        //         ...state.slice(action.payload + 1)

        //     ];
        // case ProductActionTypes.edit:

        //     return [...state.slice(0, action.payload.id), action.payload, ...state.slice(action.payload.id + 1,)]


        default:
            return state;
    }


}
