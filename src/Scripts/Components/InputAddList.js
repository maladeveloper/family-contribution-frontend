import React from 'react';
import './InputAddList.css'


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
              {headers && Object.keys(headers).map((key, index) =>{
                  return <th key={"header"+ headers[key]["id"]}><div>{headers[key]["disp"]}</div></th>
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
            { Object.keys(headers).map((key, index) => {
                return <td key={index}>{row[key]}</td>
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
                            <input onChange={this.handleChange} type={this.props.headers[key]['type']} id={this.props.headers[key]['id']} value={this.state[this.props.headers[key]['id']]}/>
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

        this.addNewItem = this.addNewItem.bind(this)
    }

    addNewItem(newData){

      this.setState({
        data:[...this.state.data,
          newData]
      });
      

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

            <center><TableInput headers={this.props.headers} rowData ={this.state.data} addNewItem={this.addNewItem}/></center>



          </div>
        
        )
    }
}

export default InputAddList;
