
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
        default:
            return state;
    }


}