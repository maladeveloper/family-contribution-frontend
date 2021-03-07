import './InputAddList.css'
import React, { useState } from 'react';

const exampleInfo = [{
    "NAME": "Ghost in The Wires",
    "AMOUNT": "2",
    "DATE": "08/15/2011"
  },
  {
    "NAME": "Console Wars",
    "AMOUNT": "4",
    "DATE": "05/13/2014"
  },
 ]

  const Table = (props) => {
    const { headers, rowData } = props;
    return (
      <div>
        <table className="table table-bordered table-hover">
        <TableHeader headers={headers}></TableHeader>
        <TableBody headers={headers} rowData={rowData}></TableBody>
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
  
  const TableBody = (props) => {
    const { headers, rowData } = props;
    
    //Make the state update so as to force a re-render
    const [value, setValue] = useState(0); // integer state

    function buildRow(row, rowIndex, headers) {
        return (
            <tr id={rowIndex}>
            { Object.keys(headers).map((key, index) => {

                return <td key={index}>{row[key]}</td>
            })}
            <td><button id={rowIndex} onClick={removeRow} class="btn btn-danger">X</button></td>
            </tr>
        )
    };


    function removeRow(event){

      console.log(rowData)
      //Remove the row by the index
      var index = event.target.id

      rowData.splice(index, 1)

      console.log(rowData)

      setValue(value => ++value); // update the state to force render

    }

    return(
      <tbody>
        { rowData && rowData.map((value, index) => {
                return buildRow(value,index, headers);
            })}
      </tbody>
  );
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

      console.log(this.state)
      
    }
    handleSubmit(event) {
        event.preventDefault();
    
        //The state has the information that is neccessary, thus pass this
        console.log(this.state)

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
            <button onClick={this.handleSubmit} class="btn btn-info">Add</button> 
        
            
            </div>
        )
        
        }
}


class InputAddList extends React.Component{

    constructor(props){

        super(props);

        //Set it as an empty array or the props dataArray if defined
        if(this.props.dataArray != undefined){
          
          this.state = {
            data: this.props.dataArray // Change to an empty array after it has been completed.  
          }

        }
        else{

          this.state = {
            data: []
          }
        
        }

        this.addNewItem = this.addNewItem.bind(this)
    }

    addNewItem(newData){

      this.setState({
        data:[...this.state.data,
          newData]
      });

      //Call the parent if it wants to handle this data 
      if(this.props.parentOutput){

        this.props.parentOutput([...this.state.data,newData])
      }
      
    }


    render (){
    
        return(
            
          <div >
            <center><TableInput headers={this.props.headers} rowData ={this.state.data} addNewItem={this.addNewItem}/></center>
            <br></br>
            {
            //Show the table only if something exists in it.
            this.state.data.length > 0
                &&
                <Table headers={this.props.headers} rowData ={this.state.data} /> 
            }




          </div>
        
        )
    }
}

export default InputAddList;
