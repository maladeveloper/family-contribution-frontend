import React from 'react';
import DisplayTable from './DisplayTable'; 



class PaidPage extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            rowData:null
        }

    }

    componentDidMount(){

        var rowData = formatPayInfoToRowData(this.props.payInfo.users)

        this.setState({

            rowData: rowData
        })
    }

    render(){
        return(
            <>
  
                <div>
                    {
                    this.state.rowData
                    
                    ?
                    <div><DisplayTable rowData={this.state.rowData} headers={headers} /></div>
                    :
                    <div>Loading</div>


                    }
                      

                </div>

            </>
        )
    }



}
//This header list is what is passed in by the parent (delete after)
const headers = {

    "NAME":{
        "type": "text", 
        "disp": "Name", //How this variable would be displayed to the user.
        "id": "NAME",  //ID has to match with key name.
        "readOnly": true, //If modifications can be made on input array
        "options": {
          "array": null , //Must be here if readonly is true
        },
        "unique": true // Whether this field must be unique in the entire table - this can only be the case for ONE field. 
    }, 
    "INCOME":{
        "type": "number", 
        "disp": "Total Income ($)", 
        "id": "INCOME",
        "unique": false
    },
    "TAX_DUE":{
        "type": "number", 
        "disp": "Tax Due($)", 
        "id": "TAX_DUE",
        "unique": false
    },

    "TAX_PERC":{
        "type": "number", 
        "disp": "Taxed Percentage (%)", 
        "id": "TAX_PERC",
        "unique": false
    },  

}

function formatPayInfoToRowData(payInfo){

    var rowData = []

    Object.entries(payInfo).forEach(element => {
        
        var newRow = {}

        newRow["NAME"] = element[0]

        newRow["TAX_DUE"] = Number(element[1]["taxDue"]) 
        
        newRow["INCOME"] = Number(element[1]["income"])

        newRow["TAX_PERC"] = newRow["INCOME"]== 0 ? 0 : 100 * (newRow["TAX_DUE"]/newRow["INCOME"])

        newRow["TAX_PERC"] = newRow["TAX_DUE"] == 0 ? 0 : newRow["TAX_PERC"]

        rowData.push(newRow)

    });

    return rowData



}

export default PaidPage;
