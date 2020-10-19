
import { Action } from '@ngrx/store';
import { Products } from './products';
import { cart, dashboard } from './reducer';
import { Stores } from './stores';
export enum StoresActionTypes {
    Add = '[Stores Component] Add',
    Remove = '[Stores Component] Remove',
    edit = '[Stores Component] edit',
    ProductAdd = '[Product Component] Add',
    ProductRemove = '[Product Component] Remove',
    ProductEdit = '[Product Component] edit',
    getstores = "[stores Component] get Successfull",
    Loadstores = "[stores Component] load Successfull",
    getproducts = "[Product Component] get Successfull",
    Loadproducts = "[Product Component] load Successfull",
    getcart = "[Product Component] get cart Successfull",
    Loadcart = "[Product Component] load cart Successfull",
    getdashboard = "[Product Component] get dashboard Successfull",
    Loaddashboard = "[Product Component] load dashboard Successfull",
    deleteproduct = "[Product Component] delete product from cart Successfull",
    updatequantity = "[Product Component] update quantity from cart Successfull",
    searchproducts = "[Product Component] search  product  Successfull",
    loadsearchproducts = "[Product Component] load search product  Successfull",
    cartproductremove = "[Product Component] cart remove product  Successfull",
    emptystores = "[Product Component] empty stores Successfull",
    getfilterstores = "[userstores Component] get filter stores  Successfull",
    loadfilterstores = "[userstores Component] load filter stores Successfull",
    getuserstores = "[userstores Component] get stores  Successfull",
    loaduserstores = "[userstores Component] load stores Successfull",





}

export class ActionEx implements Action {
    readonly type;
    payload: any;
}
export class StoresAdd implements ActionEx {
    readonly type = StoresActionTypes.Add;
    constructor(public payload: any) {
    }
}
export class getfilterstores implements Action {
    readonly type = StoresActionTypes.getfilterstores;

}
export class loadfilterstores implements Action {
    readonly type = StoresActionTypes.loadfilterstores;

    constructor(public payload: Stores[]) { }
}
export class getuserstores implements Action {
    readonly type = StoresActionTypes.getuserstores;

}
export class loaduserstores implements Action {
    readonly type = StoresActionTypes.loaduserstores;

    constructor(public payload: Stores[]) { }
}
export class getstores implements Action {
    readonly type = StoresActionTypes.getstores;

}
export class emptystores implements Action {
    readonly type = StoresActionTypes.emptystores;

}
export class Loadstores implements Action {
    readonly type = StoresActionTypes.Loadstores;

    constructor(public payload: Stores[]) { }
}
export class updatequantity implements Action {
    readonly type = StoresActionTypes.updatequantity;

    constructor(public pid: number, public payload: any) {
        console.log(pid);
        payload = Object.assign(payload, { pid: pid });
        console.log(payload);


    }
}
export class getcart implements Action {
    readonly type = StoresActionTypes.getcart;
}
export class Loadcart implements Action {
    readonly type = StoresActionTypes.Loadcart;

    constructor(public payload: cart[]) { }
}
export class getdashboard implements Action {
    readonly type = StoresActionTypes.getdashboard;
}
export class Loaddashboard implements Action {
    readonly type = StoresActionTypes.Loaddashboard;

    constructor(public payload: any) { }
}
export class getproducts implements Action {
    readonly type = StoresActionTypes.getproducts;
}
export class Loadproducts implements Action {
    readonly type = StoresActionTypes.Loadproducts;

    constructor(public payload: Products[]) { }
}
export class searchproducts implements Action {
    readonly type = StoresActionTypes.searchproducts;
}
export class loadsearchproducts implements Action {
    readonly type = StoresActionTypes.loadsearchproducts;

    constructor(public payload: Products[]) { }
}
export class StoresEdit implements ActionEx {
    readonly type = StoresActionTypes.edit;


    constructor(public id: number, public payload: any) {
        payload = Object.assign(payload, { id: id });

    }
}
export class StoresRemove implements ActionEx {
    readonly type = StoresActionTypes.Remove;
    constructor(public payload: any) {
    }
}
export class deleteproduct implements ActionEx {
    readonly type = StoresActionTypes.deleteproduct;
    constructor(public payload: any) {
    }
}
export class ProductAdd implements ActionEx {
    readonly type = StoresActionTypes.ProductAdd;
    constructor(public payload: any) {

    }
}
export class ProductEdit implements ActionEx {
    readonly type = StoresActionTypes.ProductEdit;


    constructor(public id: number, public payload: any) {
        payload = Object.assign(payload, { id: id });


    }
}
export class ProductRemove implements ActionEx {


    readonly type = StoresActionTypes.ProductRemove;
    constructor(public payload: any) {

    }
}
export class cartproductremove implements ActionEx {


    readonly type = StoresActionTypes.cartproductremove;
    constructor(public payload: any) {

    }
}
export type storeaction = searchproducts | getuserstores | loaduserstores | getfilterstores | loadfilterstores | emptystores | cartproductremove | loadsearchproducts | StoresAdd | StoresRemove | StoresEdit | ProductAdd | ProductRemove | ProductEdit | getstores | Loadstores | getcart | Loadcart | getproducts | Loadproducts | getdashboard | Loaddashboard | deleteproduct | updatequantity;
