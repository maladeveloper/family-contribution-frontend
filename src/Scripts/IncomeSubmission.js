import React from 'react';
import InputAddList from './Components/InputAddList'; 
import {getUserInfo} from './Redux/Selectors'; 
import { connect } from "react-redux";


class IncomeSubmission extends React.Component{

    constructor(props){
        super(props)

        //Make a state with the info about income data
        this.state = {
            incomeDateData: null,
            totalIncome: 0,
        }

        this.handleInputChange = this.handleInputChange.bind(this)

    }



    componentDidMount(){

        //Get the payment date data for this user and date



    }

    handleInputChange(dataReceived){
        console.log(dataReceived)

        var sum = 0 

        dataReceived.forEach((item, index) =>{

            sum += Number(item["AMOUNT"])
        })

        this.setState({
            totalIncome: sum
        })
        

    }

    render(){

        //Need to pass in the jobs of the person and the dates
        var headerInfo = headers; 

        headerInfo["NAME"]["options"]["array"] = this.props.userInfo.jobs;
    
        return(
            <div>
                <p>{this.state.totalIncome}</p>
            
            <div class="income-box">
                <InputAddList headers={headerInfo} parentOutput={this.handleInputChange}/>
            </div>

            </div>
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

  //Connect this component to store
export default connect(state => ( { userInfo: getUserInfo(state)} ))(IncomeSubmission);
