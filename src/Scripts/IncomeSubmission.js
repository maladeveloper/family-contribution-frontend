import React from 'react';
import {getDateUserSpecificData} from './Variables';
import InputAddList from './Components/InputAddList'; 


class IncomeSubmission extends React.Component{

    constructor(props){
        super(props)

        //Make a state with the info about income data
        this.state = {
            incomeDateData: null
        }

    }



    componentDidMount(){

        //Get the payment date data for this user and date



    }

    render(){
    
        return(
            
            <div class="income-box">
                <InputAddList headers={headers}/>
            </div>
        )
    }



}
export default IncomeSubmission;


//This header list is what is passed in by the parent (delete after)
const headers = {

    "NAME":{
        "type": "text", 
        "disp": "Name", //How this variable would be displayed to the user.
        "id": "NAME",  //ID has to match with key name.
        "readOnly": true, //If modifications can be made on input array
        "options": {
          "array":['Bosch', 'VCAA', 'Tutoring', 'Other'], //Must be here if readonly is true
          
        }
    }, 
    "AMOUNT":{
        "type": "number", 
        "disp": "Amount ($)", 
        "id": "AMOUNT"
    }, 
    "DATE":{
        "type":"date", 
        "disp": "Date", 
        "id": "DATE",
        "dateInfo": { // This date information is needed to restrict dates.
          "minDate":"2013-10-01", //Need to pass in these dates through the input
          "maxDate": "2013-10-20"
        }
    }
  }