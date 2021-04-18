import React from 'react';
import Contribution from './Contribution'
import { connect } from "react-redux";
import {UPDATEUSERINFO} from "./Redux/Actions"; 
import {UPDATEUSERID} from "./Redux/Actions";
import {getUserInfo} from "./Variables";
import {webFuncInteraction, backendWebVars} from "./BackendIneterface";
import LoginPage from "./LoginPage";

class LoginParentPage extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            //loggedOnUserId: null 
            loggedOnUserId: null, //FOR NOW LETS ASSUME USER PUT THIS AS ID (later make a login page)
            logOnSuccess: false, 
        }


        this.updateLogonStatus = this.updateLogonStatus.bind(this);
        this.setUserId = this.setUserId.bind(this); 

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
                                    <Contribution userId={this.state.loggedOnUserId}/>
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
