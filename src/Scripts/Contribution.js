import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {getHistoryData,refreshDates} from './Variables';


class Contribution extends React.Component{

    constructor(props){
        super(props)

        //The state of class
        this.state = {
            currentDate: null,
            dateOptions: null, 
            dateInformation: null

        }

        this.updateDates = this.updateDates.bind(this); 
        this.handleDateChoice = this.handleDateChoice.bind(this)

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
        refreshDates(data).then(() => getHistoryData().then( refreshedData =>
         
            //Now set the state
            this.setState({
              currentDate: getCurrentWeek(), 
              dateOptions: refreshedData
            })
          )
        )
      }
      //Otherwise just set the data
      else{

        //Set the data in the state 
        this.setState({
          currentDate: getCurrentWeek(), 
          dateOptions: data
        })
      }
    }

    handleDateChoice(e){

      //Get the chosen date which has become the target value
      var chosenDate = e.target.value

      //Set it as the current date 
      this.setState({
        currentDate: chosenDate
      })



    }

    

    render(){
        console.log(this.state.dateOptions)
        return(
            <div>
                {//Check if the options have loaded 
                this.state.dateOptions != null
                ?
                <div>
                    <div>
                        <Select
                        title={"Select Date"}
                        name={'date'}
                        options = {this.state.dateOptions}
                        value = {this.state.currentDate}
                        handleChange = {this.handleDateChoice}
                        />
                    </div>
                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                        <Tab eventKey="income-submission" title="Income Submission">
                        <div>{getCurrentWeek()} </div>
                        </Tab>
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
    follSunday.setDate(follSunday.getDate() + (7 + 0 - follSunday.getDay()) % 7);

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
