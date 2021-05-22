import React from 'react';
import Contribution from './Contribution'
import { connect } from "react-redux";
import {UPDATEUSERINFO} from "./Redux/Actions"; 
import {UPDATEUSERID} from "./Redux/Actions";
import {getUserInfo} from "./Variables";
import {webFuncInteraction, backendWebVars} from "./BackendIneterface";
import LoginPage from "./LoginPage";
import Homepage from './Homepage';

class LoginParentPage extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            //loggedOnUserId: null 
            loggedOnUserId: null, 
            logOnSuccess: false, 
        }

    

        this.updateLogonStatus = this.updateLogonStatus.bind(this);
        this.setUserId = this.setUserId.bind(this);
        
        

    }
    //REMOVE THIS CODE AFTER.
    componentDidMount(){
        this.setUserId("MAL001")
    }

    updateLogonStatus(data){

        this.props.UPDATEUSERINFO(data)

        this.props.UPDATEUSERID(this.state.loggedOnUserId)

        this.setState({logOnSuccess: true})

    }

    setUserId(chosenId){
        
        this.setState({loggedOnUserId: chosenId})

        
        webFuncInteraction(backendWebVars.INIT, {userId:chosenId}).then(data => this.updateLogonStatus(data))
        
    
    }


    render(){

        return(

            <div>
                {this.state.loggedOnUserId 
                    ?
                    [
                        <div>
                            {
                            this.state.logOnSuccess

                            ?
                                <div>
                                    <Homepage userId={this.state.loggedOnUserId}/>
                                </div>

                            :
                                <div>Loading...</div>
                            }
                        </div>
                    ]
                    :
                    [
                        <div><LoginPage setUserId={this.setUserId}/></div>
                    ]
                }
            </div>
            
        )
    }

}


export default connect(null, {UPDATEUSERINFO, UPDATEUSERID})(LoginParentPage);
