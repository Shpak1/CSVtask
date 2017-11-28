import React, { PureComponent  } from 'react';
import './style/App.css';

class Table extends PureComponent  {

    constructor(props) {
        super(props);
        this.sort = 'incr';
        this.state = {
            newBody:[]
        }
    }

     _sortTable(index, body, sort) {
        let sortingData = [];// define store for data colums
         let newBody = []; // define the final array body
         let findItem, exist; // tempory object for store values

         body.map((val)=> {
            sortingData.push(val[index]);
        });
         if(sort === 'incr'){
             sortingData.sort();
         } else {
             sortingData.sort()
         }
         sortingData.map(val=> {
             body.map((value, i)=>{
                 findItem =  value.find(()=>val == value[index]);
                 exist = newBody.some(()=>newBody[i] === value); // check if the value exist in array
                 if (findItem && !exist){
                     newBody.push(value)
                 }
             })

         });
         this.sort = this.sort === 'incr' ? 'decr' : 'incr';// 'incr' mean sort from big to small , 'decr' from small to big
         console.log(newBody)
         this.setState({newBody:newBody});
    }
    componentWillReceiveProps(nextProps){
        this.setState({newBody:nextProps.body})
    }

    render() {
        let {header} = this.props;
        let body = this.state.newBody;
        return (
            <table id="myTable">
                <thead>
                    {header && header.map((val,i)=>(
                        <th key = {i} onClick={()=>this._sortTable(i, body, this.sort)}>{val}</th>
                    ))}
                </thead>
                <tbody>
                {body && body.map((val,i)=> (
                    <tr key = {i}>
                        {
                            val.map((value, index)=> (
                                <td key={index}>{value}</td>))
                        }
            </tr>))}
                </tbody>
            </table>
        );
    }
}

export default Table;
