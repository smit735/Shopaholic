
import { state } from '@angular/animations';
import { ActionEx, StoresActionTypes } from './actions';
export const initialState = [];

export function StoresReducer(state = initialState, action: ActionEx) {
    switch (action.type) {
        case StoresActionTypes.Add:
            console.log(state);
            return [...state, action.payload];
        case StoresActionTypes.Remove:
            return [
                ...state.slice(0, action.payload),
                ...state.slice(action.payload + 1)

            ];
        case StoresActionTypes.edit:

            return [...state.slice(0, action.payload.id), action.payload, ...state.slice(action.payload.id + 1,)]


        default:
            return state;
    }


}
export function getstate() {
    console.log(this.state);

}