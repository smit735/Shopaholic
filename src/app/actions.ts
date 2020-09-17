
import { Action } from '@ngrx/store';
export enum StoresActionTypes {
    Add = '[Stores Component] Add',
    Remove = '[Stores Component] Remove',
    edit = '[Stores Component] edit',
    ProductAdd = '[Product Component] Add',
    ProductRemove = '[Product Component] Remove',
    ProductEdit = '[Product Component] edit'
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
export class StoresEdit implements ActionEx {
    readonly type = StoresActionTypes.edit;


    constructor(public id: number, public payload: any) {
        console.log(id);
        payload = Object.assign(payload, { id: id });
        console.log(payload);

    }
}
export class StoresRemove implements ActionEx {
    readonly type = StoresActionTypes.Remove;
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
        console.log(id);
        payload = Object.assign(payload, { id: id });
        console.log(payload);


    }
}
export class ProductRemove implements ActionEx {


    readonly type = StoresActionTypes.ProductRemove;
    constructor(public payload: any) {
        console.log(payload);

    }
}
export type storeaction = StoresAdd | StoresRemove | StoresEdit | ProductAdd | ProductRemove | ProductEdit;
