import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import IncomeSubmission from './IncomeSubmission';
import Payment from './Payment';
import {Select} from './Components/Select' 
import {webFuncInteraction, backendWebVars} from "./BackendIneterface";


class Contribution extends React.Component{

    constructor(props){
        super(props)

        //The state of class
        this.state = {
            chosenDate: null,
            dateOptions: null, 
            dateInformation: null, 
            dateInfoReceived: false,
            paymentInfo: null,
            incomeUpdatedSetter:0 

        }

        this.handleDateChoice = this.handleDateChoice.bind(this);

    }

    componentDidMount(){
      
      //Call for the dates data to be set      
      webFuncInteraction(backendWebVars.PREV_DATES, {}).then(data =>this.setState({dateOptions:data}))

    }
    

    handleDateChoice(e){

      //Get the chosen date which has become the target value
      var chosenDate = e.target.value

      //Set it as the current date 
      this.setState({
        chosenDate: chosenDate, 
        dateInfoReceived: false
      })

      //Call for the user information and then set the state with the data
      webFuncInteraction(backendWebVars.USER_SPEC_DATA,{date:chosenDate, userId:this.props.userId}).then(data => {

        //Set the information
        this.setState({
          dateInformation: data,
          dateInfoReceived: true 

        }) 
      }) 

    }



    


    

    render(){

      //The date options must be chosen and loaded in
      if(this.state.dateOptions != null){

        return(
          <div>
              <div>  
                <Select
                title={"Select Date"}
                name={'date'}
                options = {this.state.dateOptions}
                value = {this.state.chosenDate}
                handleChange = {this.handleDateChoice}
                />
              </div>
              {this.state.dateInfoReceived
                  &&
                  [
                    <div> 
                        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                            <Tab eventKey="income-submission" title="Income Submission">
                            <div><IncomeSubmission chosenDate={this.state.chosenDate} prevData={this.state.dateInformation}/></div>
                            </Tab>

                              <Tab eventKey="payment" title="Payment Summary">
                              <div><Payment chosenDate={this.state.chosenDate} /></div>
                              </Tab>
                    
                        </Tabs>
                    </div>
                  ]
                  
              }

          </div>
        )
      }

      return(
    
          <div>Loading...</div>
      )
    }
}









export default Contribution; 
