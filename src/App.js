import React, { Component } from 'react';
import './style/App.css';
import Table from './table'
import renderIcon from './Recources/render.svg'

class App extends Component {

    constructor(props){
        super(props);
        this.body;
        this.state = {
            focus:false,
            value:'',
            header:[],
            tableBody:[]
        }
        this.handleChange = this._handleChange.bind(this)    }

    _handleChange(e){
        this.setState({value : e.target.value})
    }

    _onClick(){
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        if(this.state.value === '') return
        let strData = this.state.value;
        let strDelimiter = ',';

        // Create a regular expression to parse the CSV values.
        let regularExp = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
        );


        // Create an array to hold our data. Give the array
        // a default empty first row.
        let arrData = [[]];

        // Create an array to hold our individual pattern
        // matching groups.
        let arrMatches = null;


        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = regularExp.exec( strData )){
            // Get the delimiter that was found.
            let strMatchedDelimiter = arrMatches[ 1 ];

            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (
                strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
            ){

                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push( [] );

            }

            let strMatchedValue;

            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[ 2 ]){

                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( "\"\"", "g" ),
                    "\""
                );

            } else {

                // We found a non-quoted value.
                strMatchedValue = arrMatches[ 3 ];

            }


            // Now that we have our value string, let's add
            // it to the data array.
            if(strMatchedValue){
                arrData[arrData.length - 1].push(strMatchedValue);
            } else {
                arrData[ arrData.length - 1 ].push( '' )
            }
        }

        // Return the parsed data.
        this.body = arrData.splice(1);
        this.setState({header:arrData[0]});
        console.log(arrData)
    }
    _calculateRows(){ //for dynamic resize textarea
        let rows;
        if(this.state.value) {
            let data = this.state.value
            rows = data.split(/\r?\n|\r/);
            return rows.length
        }

    }
    _borderControl(){
        this.setState({focus:true})
    }
    _borderControlBlur(){
        this.setState({focus:false})
    }

  render() {
    return (
      <div className="renderMainDiv">
          <div className="headerSpan">
              <span>Test task for AgileEngine</span>
          </div>
          <div className="subtitleSpan">
              <span>Use ',' for delimiter, or you can specify your own on App.js(25)</span>
          </div>
          <div className="wrapper">
                  <textarea className='textareaTable'
                            wrap ='off'
                            rows={this._calculateRows()}
                            onChange={this.handleChange}
                            value={this.state.value}
                            onFocus={()=>this._borderControl()}
                            onBlur={()=>this._borderControlBlur()}
                            placeholder = 'place your CVS here'>
                  </textarea>
              <div className={this.state.focus ? 'controlFocus' :"controls"}>
                  <button className="buttonStyle" disabled={!this.state.value} onClick={()=>this._onClick()}>
                      <img src={renderIcon}/>
                  </button>
              </div>
          </div>
          <Table
              body = {this.body}
              header = {this.state.header}
          />
      </div>
    );
  }
}

export default App;
