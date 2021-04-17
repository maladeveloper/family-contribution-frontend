import './InputAddList.css'
import React, { useState } from 'react';
import {getUserInfo} from '../Redux/Selectors'; 
import { connect } from "react-redux";
import {Table} from "./Table";


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
            <button  onClick={this.handleSubmit} disabled={this.props.submissionStatus} class="btn btn-info">Add</button>
            
        
            
            </div>
        )
        
        }
}


class InputAddList extends React.Component{

    constructor(props){

        super(props);

        //Set it as an empty array or the props dataArray if defined
        if(this.props.prevData){
          
          this.state = {
            data: this.props.prevData, // Change to an empty array after it has been completed.
            submitted: (this.props.prevData.length > 0) ? true : false
          }
        }
        
        else{

          this.state = {
            data: []
          }
        }
        
        this.addNewRow = this.addNewRow.bind(this)

        this.sendIt = this.sendIt.bind(this);

        this.editIt = this.editIt.bind(this);
    }

    sendIt(){

      this.props.updateIncomeDatabase(this.state.data)

      this.setState({submitted:true})
      
    }

    editIt(){

      this.setState({submitted:false})
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
            <center><TableInput submissionStatus={this.state.submitted} headers={this.props.headers} rowData ={this.state.data} addNewItem={this.addNewRow}/></center>
            <br></br>
<>
                <Table  submissionStatus={this.state.submitted} headers={this.props.headers} rowData ={this.state.data} updateSum={this.props.updateSum}  /> 

                <center>
                  {
                  !this.state.submitted
                  ?
                    <button onClick={this.sendIt} class="btn btn-success">Submit</button>
                  
                  :
                    <button onClick={this.editIt} style={{"marginLeft":"20px"}} class="btn btn-primary" >Edit</button>
                  }
                </center> 
                </>
                
            
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
