import * as type from './actionTypes'


export const tableData = (header, body) =>{
    return{
            type: type.DISPATCH_DATA_TABLE,
           header:header, body:body
        }
    };