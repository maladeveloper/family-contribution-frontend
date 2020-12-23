import React from 'react';
import './InputAddList.css'
const headerToInfo = {

    "NAME":{
        "type": "text", 
        "disp": "Name",  //How this variable would be displayed to the user.
        "id": "name"
    }, 
    "NUMBER":{
        "type": "number", 
        "disp": "Amount", 
        "id": "amount"
    }, 
    "DATE":{
        "type":"date", 
        "disp": "Date", 
        "id": "date"
    }
}

const exampleInfo = [{
    "NAME": "Ghost in The Wires",
    "NUMBER": "2",
    "DATE": "08/15/2011"
  },
  {
    "NAME": "Console Wars",
    "NUMBER": "4",
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
              {headers && headers.map((header, index) =>{
                  return <th key={index}><div>{headerToInfo[header]["disp"]}</div></th>
              })}
            </tr>
        </thead>
    );
  }
  
  const TableBody = (props) => {
    const { headers, rowData } = props;

    function buildRow(row, rowIndex, headers) {
        return (
            <tr key={rowIndex}>
            { headers.map((value, index) => {
                return <td key={index}>{row[value]}</td>
            })}
            </tr>
        )
    };

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
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleChange = this.handleChange.bind(this);
    }
    

    handleSubmit(event) {
        event.preventDefault();
        
        //Get the form by id

        const data = []
        console.log(event.target.elements)
        console.log(Object.keys(event.target.elements))
        Object.keys(event.target.elements).map((id, eventData) => {
            data.push(event.target.elements[id].value)
        })

        //Remove last element from the array (which is the button)
        console.log(data);

      }

    render(){
        return(
            <div>
            <form id="form">
                {
                    this.props.headers && this.props.headers.map((header, index) =>{

                        return(
                            <>
                            <label>{headerToInfo[header]["disp"]}</label>
                            <input type={headerToInfo[header]['type']} id={index} name={index}/>
                            </>
                        )
                    })
                }

                
                             
            </form>
            <button onClick={this.handleSubmit} class="btn btn-info">Add</button> 
        
            
            </div>
        )
        
        }
}


class InputAddList extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            data: exampleInfo // Change to an empty array after it has been completed.  
        }

        this.renderNewItem = this.renderNewItem.bind(this)
    }

    renderNewItem(){


    }


    render (){
    
        return(
            
          <div >
            
            {
            //Show the table only if something exists in it.
            this.state.data.length > 1
                &&
                <Table headers={this.props.headers} rowData ={this.state.data} /> 
            }

            <center><TableInput headers={this.props.headers} rowData ={this.state.data}/></center>



          </div>
        
        )
    }
}

export default InputAddList;
