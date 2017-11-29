export const tableData = (header, body) =>{
    return{
            type: 'DISPATCH_DATA_TABLE',
           header:header, body:body
        }
    }