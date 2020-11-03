import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'

class Contribution extends React.Component{

    

    render(){
        return(
            <div>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                    <Tab eventKey="income-submission" title="Income Submission">
                    <div>{getCurrentWeek()} </div>
                    </Tab>
                    <Tab eventKey="payment" title="Payment">
                    <div>World</div>
                    </Tab>
                </Tabs>
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
export default Contribution;
