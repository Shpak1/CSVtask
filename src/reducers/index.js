export default function TableData (state = {}, action) {
    switch (action.type) {
        case 'DATA_TABLE':
            console.log(action);
            return {
                ...state, header:action.header, body:action.body
            };
        default:
            return state
    }
}