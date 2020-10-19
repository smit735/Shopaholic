
import { Stores } from "./stores";
import { Products } from "./products";
import { ActionEx, StoresActionTypes, storeaction } from './actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
export interface products {
    id: number;
    name: string;
    img: string;

    price: number;

}
export interface dashboard {
    id: string;
    products: Number;
    stores: Number;
    users: Number;


}
export interface cart {
    id: number;
    name: string;
    quantity: number;

    price: number;

}
export interface Istore {
    data: Array<Stores>;
    products: Array<products>;
    cart: Array<cart>;
    dashboard: Array<dashboard>;


}

export const initialState: Istore = {
    data: [],

    products: [],
    cart: [],
    dashboard: []


}

export function StoresReducer(state: Istore = initialState, action: storeaction): Istore {



    switch (action.type) {
        case StoresActionTypes.Add:
            return {
                ...state,
                data: [...state.data, action.payload],

            }
        case StoresActionTypes.Loadstores:

            return {
                ...state,
                data: [...state.data, ...action.payload],

            }
        case StoresActionTypes.loadfilterstores:

            return {
                ...state,
                data: [...action.payload],

            }
        case StoresActionTypes.loaduserstores:

            return {
                ...state,
                data: [...action.payload],

            }
        case StoresActionTypes.emptystores:

            return {
                ...state,
                data: [],

            }
        case StoresActionTypes.Loaddashboard:

            return {
                ...state,
                dashboard: [...action.payload],

            }

        case StoresActionTypes.Loadcart:
            console.log(state.cart);
            return {
                ...state,
                cart: [...action.payload],

            }
        case StoresActionTypes.getproducts:
            // console.log(state.data);


            return {
                ...state,

                products: [],

            }
        case StoresActionTypes.Loadproducts:
            // console.log(state.data);

            return {
                ...state,

                products: [...action.payload],

            }
        case StoresActionTypes.loadsearchproducts:
            // console.log(state.data);

            return {
                ...state,

                products: [...action.payload],

            }
        case StoresActionTypes.cartproductremove:
            console.log(action.payload);

            return { ...state, data: [...state.data], products: [...state.products], cart: [...state.cart.slice(0, action.payload), ...state.cart.slice(action.payload + 1)] };

        case StoresActionTypes.updatequantity:

            return { ...state, cart: [...state.cart.slice(0, action.payload.pid), action.payload, ...state.cart.slice(action.payload.pid + 1,)] }

        case StoresActionTypes.deleteproduct:


            return { ...state, cart: [...state.cart.slice(0, action.payload), ...state.cart.slice(action.payload + 1)] };
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
