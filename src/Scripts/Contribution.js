import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {getDateUserSpecificData, getHistoryData,refreshDates} from './Variables';
import IncomeSubmission from './IncomeSubmission'; 


class Contribution extends React.Component{

    constructor(props){
        super(props)

        //The state of class
        this.state = {
            chosenDate: null,
            dateOptions: null, 
            dateInformation: null, 
            dateInfoReceived: false, 

        }

        this.updateDates = this.updateDates.bind(this); 
        this.handleDateChoice = this.handleDateChoice.bind(this); 
        this.setDateInformationData = this.setDateInformationData.bind(this)

    }

    componentDidMount(){
      
      //Call fore the dates data to be set
      getHistoryData().then(data =>this.updateDates(data))
        
  

    }
    
    updateDates(data){

      //If the current date is not in the array
      if (!data.includes(getCurrentWeek())){

        //Add the date to the array
        data.push(getCurrentWeek())

        //Then we have to ask the backend to refresh the dates
        refreshDates(data).then(() => getHistoryData().then( refreshedData =>{
         
            //Now set the state
            this.setState({
              chosenDate: getCurrentWeek(), 
              dateOptions: refreshedData
            })
          
          }
          
          )
        )
      }
      //Otherwise just set the data
      else{

        //Set the data in the state 
        this.setState({
          chosenDate: getCurrentWeek(), 
          dateOptions: data
        })

      }

      //Now call to set the date information
      this.setDateInformationData(getCurrentWeek())

    }

    handleDateChoice(e){

      //Get the chosen date which has become the target value
      var chosenDate = e.target.value

      //Set it as the current date 
      this.setState({
        chosenDate: chosenDate, 
        dateInfoReceived: false
      })

      //Call to set the information
      this.setDateInformationData(chosenDate)

    }

    setDateInformationData(chosenDate){

      //Call for the user information and then set the state with the data
      getDateUserSpecificData(chosenDate, this.props.userId).then(data => {

          //Set the information
          this.setState({
            dateInformation: (data===false ? null : data),
            dateInfoReceived: true 

          })          
        }
      )
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
                  ?
                  <div> 
                      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                          <Tab eventKey="income-submission" title="Income Submission">
                          <div><IncomeSubmission/></div>
                          </Tab>

                          {//Payment tab should only pop-up after the condition that every one has submitted income.
                          }
                          <Tab eventKey="payment" title="Payment">
                          <div>World</div>
                          </Tab>
                      </Tabs>
                  </div>
                  :
                  <div>Loading...</div>
              }

          </div>
        )
      }

      return(
    
          <div>Loading...</div>
      )
    }
}

function getCurrentWeek(){

    return getPreviousMonday()+'-'+getFollowingSunday()
};


function getPreviousMonday()
{
    var prevMonday = new Date();

    //Get the previous Monday 
    prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);

    //Change the string back into an object
    prevMonday = new Date(prevMonday)
    
    //Change it to the acceptable format
    var dd = String(prevMonday.getDate()).padStart(2, '0');
    var mm = String(prevMonday.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = prevMonday.getFullYear();

    prevMonday = dd + '/' + mm + '/' + yyyy;

    return prevMonday;
}

function getFollowingSunday(){

    var follSunday = new Date(); 
    follSunday.setDate(follSunday.getDate() + (14 + 0 - follSunday.getDay()) % 14);

    //Change it to the acceptable format
    var dd = String(follSunday.getDate()).padStart(2, '0');
    var mm = String(follSunday.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = follSunday.getFullYear();

    follSunday = dd + '/' + mm + '/' + yyyy;

    return follSunday;

}

const Select = props => {
	return (
	  <div className="form-group">
		<label for={props.name}> {props.title} </label>
		<select
		  id={props.name}
		  name={props.name}
		  value={props.value}
		  onChange={props.handleChange}
		  className="form-control"
		>
		  <option value="" disabled>
			{props.placeholder}
		  </option>
		  {props.options.map(option => {
			return (
			  <option key={option} value={option} label={option}>
				{option}
			  </option>
			);
		  })}
		</select>
	  </div>
	);
  };


export default Contribution;
