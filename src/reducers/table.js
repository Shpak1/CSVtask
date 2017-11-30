import {DATA_TABLE} from '../actions/actionTypes'
export default function TableData (state = {}, action) {
    switch (action.type) {
        case DATA_TABLE:
            return {
                ...state, header:action.header, body:action.body
            };
        default:
            return state
    }
}