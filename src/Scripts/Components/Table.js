import './InputAddList.css'
import React, { useState } from 'react';

export const Table = (props) => {
    const { submissionStatus, headers, rowData, updateSum, haveDeleteOption} = props;
 
    return (
      <div>
        
        <table className="table table-bordered table-hover">
        
        <TableHeader headers={headers}></TableHeader>
        
        <TableBody submissionStatus={submissionStatus} headers={headers} rowData={rowData} updateSum={updateSum} haveDeleteOption={haveDeleteOption} ></TableBody>
        
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

    console.log(this.props.rowData)
    return (
        <tr id={rowIndex}>
        
        { Object.keys(headers).map((key, index) => {

            return <td key={index}>{row[key]}</td>
        })}
        
        {!this.props.haveDeleteOption &&
        <td>
          
          <button id={rowIndex} disabled={this.props.submissionStatus} onClick={this.removeRow} class="btn btn-danger">X</button>
        
        </td>
        }
        </tr>
    )
    };

  render(){


    if ("AMOUNT" in this.props.headers){

        var sum = 0

        this.props.rowData.forEach((value) =>{

        sum += parseInt( value["AMOUNT"])

        })

        this.props.updateSum(sum)

    }


    return(
      
      <tbody>
      
        { this.props.rowData && this.props.rowData.map((value, index) => {
                return this.buildRow(value,index, this.props.headers);
      
        })}
      
      </tbody>
    );

  }
}