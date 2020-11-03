import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {getHistoryData,transformDate,refreshDates} from './Variables';


class Contribution extends React.Component{

    constructor(props){
        super(props)

        //The state of class
        this.state = {
            currentDate: null,
            dateOptions: null

        }

        this.updateDate = this.updateDate.bind(this)
        this.updateAndPresentDates = this.updateAndPresentDates.bind(this)
    }

    componentDidMount(){

        //Get the current week string
        var currentWeekStr = getCurrentWeek()

        //Transform the date
        transformDate(currentWeekStr).then(data => this.updateDate(data, currentWeekStr))



    }

    updateDate(currentWeekStrDict,currentWeekStr){

        //Make a method to find the key
        const getKey = (obj,val) => Object.keys(obj).find(key => obj[key] === val);

        //Split the week strings into an array so that it can be
        var currWeekArr = [getKey(currentWeekStrDict, currentWeekStr), currentWeekStr]

        //Get the history data
        getHistoryData().then(data => this.updateAndPresentDates(currWeekArr, data)
      
 
          
          )

    }

    updateAndPresentDates(currWeekArr, prevDates){
        
        //First check if current week is a part of the previous dates
        if (currWeekArr[0] in prevDates){

          //Set the date as per normal
          this.setState({
            dateOptions: prevDates,
            currentDateKey:currWeekArr[0]
          })

        }
        else{
          //This means the date must be added to the previous dates and then be pushed to the db
          prevDates[currWeekArr[0]] = currWeekArr[1]; 

          //Now push the prevDates to the database.
          refreshDates(prevDates).then(data => console.log(data))

          //Now set the state
          this.setState({
            dateOptions: prevDates,
            currentDateKey:currWeekArr[0]
          })
          
        }


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
                        options = {Object.keys(this.state.dateOptions)}
                        value = {this.state.currentDateKey}
                        // handleChange = {this.handleString}
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
