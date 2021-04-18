import React from 'react';
import DisplayTable from './DisplayTable'; 



class PaidPage extends React.Component{

    constructor(props){super(props)}

    render(){
        return(
            <>
  
                <div>
                    {
                    this.props.payInfo.users
                    
                    ?
                    <div><DisplayTable rowData={this.props.payInfo.users} headers={headers} /></div>
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

export default PaidPage;
