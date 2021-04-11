import './InputAddList.css'
import React, { useState } from 'react';
import {getUserInfo} from '../Redux/Selectors'; 
import { connect } from "react-redux";



  const Table = (props) => {
    const { headers, rowData, updateSum } = props;
 
    return (
      <div>
        
        <table className="table table-bordered table-hover">
        
        <TableHeader headers={headers}></TableHeader>
        
        <TableBody headers={headers} rowData={rowData} updateSum={updateSum} ></TableBody>
        
        </table>
      
      </div>
    );
  }
  
  const TableHeader = (props) => {
    
    const { headers } = props;
    
    return(
        
        <thead className="thead-dark" key="header-1">

            <tr key="header-0">

              {headers && Object.keys(headers).map((key, index) =>{
                  
                  return <th key={"header"+ headers[key]["id"]}><div>{headers[key]["disp"]}</div></th>
              
              })}
              
              <th key={"remove"}><div></div></th>
            
            </tr>
        
        </thead>
    );
  }
  

class TableBody extends React.Component{

  constructor(props){

    super(props)

    this.state={"removeVal":0, sum:0}

    this.buildRow = this.buildRow.bind(this)

    this.removeRow = this.removeRow.bind(this)

  }

  removeRow(event){

    var index = event.target.id      

    this.props.rowData.splice(index, 1)

    this.setState(prevState => {
      return {
      "removeVal": prevState.removeVal + 1 
    }})

  }


  buildRow(row, rowIndex, headers) {

    return (
        <tr id={rowIndex}>
        
        { Object.keys(headers).map((key, index) => {

            return <td key={index}>{row[key]}</td>
        })}
        
        <td>
          
          <button id={rowIndex} onClick={this.removeRow} class="btn btn-danger">X</button>
        
        </td>
        
        </tr>
    )
    };

  render(){

    var sum = 0

    this.props.rowData.forEach((value) =>{

      sum += parseInt( value["AMOUNT"])

    })

    this.props.updateSum(sum)

    return(
      
      <tbody>
      
        { this.props.rowData && this.props.rowData.map((value, index) => {
                return this.buildRow(value,index, this.props.headers);
      
        })}
      
      </tbody>
    );

  }
}

class TableInput extends React.Component{

    constructor(props){

        super(props)

        //Make a copy of the headers 
        var headersCopy = Object.assign({}, this.props.headers);
        

        let setAll = (obj, val) => Object.keys(obj).forEach(k => obj[k] = val);

        //Set all the headers to null
        setAll(headersCopy, "")

        this.state = headersCopy

        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event){

      this.setState({[event.target.id]: event.target.value});

    }

    handleSubmit(event) {
        
      event.preventDefault();

      this.props.addNewItem(this.state)
    }

    render(){
        return(
            <div>
            <form id="form">
                {
                    this.props.headers && Object.keys(this.props.headers).map((key, index) =>{

                        return(
                            <>
                            <label>{this.props.headers[key]["disp"]}</label>
                            {
                              
                              //Add a datalist if the options are there (even if not read only)
                              this.props.headers[key]['options'] != undefined

                              &&
                              <datalist id="NAME">
                              
                              {
                              //Return the options that are defined
                              }
                              
                              { (this.props.headers[key]['options']['array']).map((value, index) => {
                                      return <option key={index} value={value}>{value}</option>
                                  })}
                                
                              
                              </datalist>
                            }
                            { //Determine whther this input has a read only or can be changed
                              !this.props.headers[key]['readOnly']

                              ?
                              //Determine max and min date
                                (
                                this.props.headers[key]["dateInfo"] != undefined
                                
                                ?
                                <input onChange={this.handleChange} type={this.props.headers[key]['type']} id={this.props.headers[key]['id']} value={this.state[this.props.headers[key]['id']]}
                                list={this.props.headers[key]['id']} min={this.props.headers[key]["dateInfo"]["minDate"]} max={this.props.headers[key]["dateInfo"]["maxDate"]}
                                />
                                
                                :
                                
                                <input onChange={this.handleChange} type={this.props.headers[key]['type']} id={this.props.headers[key]['id']} value={this.state[this.props.headers[key]['id']]}
                                list={this.props.headers[key]['id']} 
                                />
                                )
                              
                              :
                                <select value={this.state[this.props.headers[key]['id']]} onChange={this.handleChange} id={this.props.headers[key]['id']}>
                                  <option style={{"display":"none"}}></option>
                                  
                                  {
                                  //Return the options that are defined
                                  }
                                  { (this.props.headers[key]['options']['array']).map((value, index) => {
                                        return <option key={index} value={value}>{value}</option>
                                    })}
                                  
                                </select>
                            }
                            </>
                            
                        )
                    })
                }

                
                             
            </form>
            <br></br>
            <button  onClick={this.handleSubmit} class="btn btn-info">Add</button>
            
        
            
            </div>
        )
        
        }
}


class InputAddList extends React.Component{

    constructor(props){

        super(props);

        //Set it as an empty array or the props dataArray if defined
        if(this.props.prevData != null){
          
          this.state = {
            data: this.props.prevData // Change to an empty array after it has been completed.  
          }
        }
        
        else{

          this.state = {
            data: []
          }
        }
        
        this.addNewRow = this.addNewRow.bind(this)

        this.sendIt = this.sendIt.bind(this);
    }

    sendIt(){

      this.props.updateIncomeDatabase(this.state.data)
      
    }

    addNewRow(newData){

      //Find if there are headers with no values to them.
      var noValHeaders = []
      
      Object.entries(newData).forEach((value) => {

        if (value[1].length == 0){

          noValHeaders.push(value[0])
        }
      })

      //Only add row if all headers have a value - otherwise tell user.
      if (noValHeaders.length === 0){

        var mergedData = mergeRows(this.props.headers, this.state.data, newData)

        this.setState({
          data:mergedData
        });

      }else{

        var missingVals = noValHeaders.join(", ")

        alert("Missing Values -"+ missingVals+ "\nData will not be added !")

      }
      
    }

    render (){
        
        return(
            
          <div >
            <center><TableInput headers={this.props.headers} rowData ={this.state.data} addNewItem={this.addNewRow}/></center>
            <br></br>
            {
            //Show the table only if something exists in it.
            this.state.data.length > 0
                &&
                <>
                <Table headers={this.props.headers} rowData ={this.state.data} updateSum={this.props.updateSum}  /> 

                <center><button onClick={this.sendIt} class="btn btn-success">Submit</button></center> 
                </>
            }
          </div>
        
        )
    }
}

function mergeRows(headers, currentRows, newRow){

  for(const header in headers){

    var headerInfo = headers[header]

    //If the header values are unique, we need to merged with other rows to avoid duplication.
    if (headerInfo["unique"]){

      
      var newRows = currentRows.filter( oldRow => oldRow[header]!== newRow[header]) // Remove the old row

      newRows.push(newRow)

      return newRows
    }
  }
  currentRows.push(newRow)

  return currentRows
}



export default InputAddList;
