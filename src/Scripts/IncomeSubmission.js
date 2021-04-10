import React from 'react';
import InputAddList from './Components/InputAddList'; 
import {getUserInfo, getUserId} from './Redux/Selectors'; 
import { connect } from "react-redux";
import {webFuncInteraction, backendWebVars} from "./BackendIneterface";


class IncomeSubmission extends React.Component{

    constructor(props){
        super(props)

        //Make a state with the info about income data
        this.state = {
            incomeDateData: null,
            totalIncome: 0,
        }

        this.updateSum = this.updateSum.bind(this)

        this.updateIncomeDatabase = this.updateIncomeDatabase.bind(this)

    }
    shouldComponentUpdate(nextProps, nextState){

        if (JSON.stringify(this.state) === JSON.stringify(nextState)){
            return false
        }

        return true

    }

    updateSum(sum){

        this.setState({"totalIncome": sum})
    }

    updateIncomeDatabase(dataToSend){

        console.log(dataToSend)

        console.log(this.props.userId)

        var argObject = {incomeArray:dataToSend, userId:this.props.userId}

        webFuncInteraction(backendWebVars["UPDATE_INCOME"], argObject)

    }



    render(){

        //Need to pass in the jobs of the person and the dates
        var headerInfo = headers; 

        headerInfo["NAME"]["options"]["array"] = this.props.userInfo.jobs;
    
        return(
            <div>
                <div class="total-income-box">
                    <label style={{"margin":0}}>Total Income ($):</label>
                    <p style={{"borderColor":"black", "borderWidth":1, "borderStyle":"solid", "paddingLeft":"10px", "paddingRight":"10px", "marginBlock":"auto" }}>{this.state.totalIncome}</p>
                </div>
            
                <div class="income-box">
                    <InputAddList headers={headerInfo} updateIncomeDatabase={this.updateIncomeDatabase} updateSum={this.updateSum}/>
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
export default connect(state => ( { userInfo: getUserInfo(state), userId:getUserId(state)} ))(IncomeSubmission);
