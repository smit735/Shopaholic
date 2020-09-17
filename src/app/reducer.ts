
import { state } from '@angular/animations';
import { Stores } from "./stores";
import { Products } from "./products";
import { ActionEx, StoresActionTypes, storeaction } from './actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
export interface products {
    id: number;
    name: string;
    image: string;
    category: string;
    price: number;
}

export interface Istore {
    data: Array<Stores>;
    products: Array<products>;

}

export const initialState: Istore = {
    data: [],

    products: []

}

export function StoresReducer(state: Istore = initialState, action: storeaction): Istore {



    switch (action.type) {
        case StoresActionTypes.Add:
            console.log(state.data);
            return {
                ...state,
                data: [...state.data, action.payload],

            }
        case StoresActionTypes.Remove:


            return { ...state, data: [...state.data.slice(0, action.payload), ...state.data.slice(action.payload + 1)] };
        case StoresActionTypes.edit:
            return { ...state, data: [...state.data.slice(0, action.payload.id), action.payload, ...state.data.slice(action.payload.id + 1,)] }

        // return [...state.slice(0, action.payload.id), action.payload, ...state.slice(action.payload.id + 1,)]
        case StoresActionTypes.ProductAdd:
            console.log(state.products);

            return {
                ...state,
                data: [...state.data],
                products: [...state.products, action.payload]
            }
        //     console.log(state);
        //     this.store.subscribe((store: any) => {
        //         console.log();
        //         store.stores[action.payload.id].Products = [...store.stores[action.payload.id].Products, action.payload]
        //         storevalue = store.stores[action.payload.id].Products;
        //     })
        //     const temp = []
        //     return [...state.slice(0, action.payload.id), storevalue, ...state.slice(action.payload.id + 1,)]
        case StoresActionTypes.ProductRemove:
            console.log(action.payload);

            return { ...state, data: [...state.data], products: [...state.products.slice(0, action.payload), ...state.products.slice(action.payload + 1)] };

        //     return [
        //         ...state.slice(0, action.payload),
        //         ...state.slice(action.payload + 1)

        //     ];
        case StoresActionTypes.ProductEdit:
            console.log(action.payload);

            return { ...state, data: [...state.data], products: [...state.products.slice(0, action.payload.id), action.payload, ...state.products.slice(action.payload.id + 1,)] }

        //     return [...state.slice(0, action.payload.id), action.payload, ...state.slice(action.payload.id + 1,)]


        default:
            return state;
    }


}
