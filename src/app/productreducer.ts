
import { state } from '@angular/animations';
import { ActionEx, ProductActionTypes } from './productaction';

export const initialState = [];

export function ProductReducer(state = initialState, action: ActionEx) {
    switch (action.type) {
        case ProductActionTypes.Add:
            console.log(state);
            return [...state, action.payload];
        case ProductActionTypes.Remove:
            return [
                ...state.slice(0, action.payload),
                ...state.slice(action.payload + 1)

            ];
        case ProductActionTypes.edit:

            return [...state.slice(0, action.payload.id), action.payload, ...state.slice(action.payload.id + 1,)]


        default:
            return state;
    }


}
