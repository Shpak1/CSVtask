import React, { PureComponent  } from 'react';
import './style/Table.css';
import {connect} from 'react-redux'


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
                  exist = newBody.indexOf(value);
                 if (findItem && exist ===-1){
                     newBody.push(value)
                 }
             })

         });
         this.sort = this.sort === 'incr' ? 'decr' : 'incr';// 'incr' mean sort from big to small , 'decr' from small to big
         this.setState({newBody:newBody});
    }

    render() {
        let header = this.props.dataForTable.header;
        let body = this.props.dataForTable.body;
        return (
            <div className="mainTableFrame">
                <div className="tableSpan">Table</div>
                <div className="descriptionSpan">Your data will be appear hire</div>
                    <table className="Table">
                        <thead>
                        <tr className="headerTable">
                            {header && header.map((val,i)=>(
                                <td key = {i} onClick={()=>this._sortTable(i, body, this.sort)}>{val}</td>
                            ))}
                        </tr>
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
                </div>
        );
    }
}
const mapStateToProps = ({ dataForTable }) =>({
    dataForTable
});

export default connect (mapStateToProps, null) (Table);
