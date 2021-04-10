import React from 'react';
import Contribution from './Contribution'
import { connect } from "react-redux";
import {UPDATEUSERINFO} from "./Redux/Actions"; 
import {UPDATEUSERID} from "./Redux/Actions";
import {getUserInfo} from "./Variables";
import {webFuncInteraction, backendWebVars} from "./BackendIneterface";

class LoginPage extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            //loggedOnUserId: null 
            loggedOnUserId: "MAL001", //FOR NOW LETS ASSUME USER PUT THIS AS ID (later make a login page)
            logOnSuccess: false, 
        }

        //FOR NOW DISPATCH GETTING THE USER INFO
        webFuncInteraction(backendWebVars.USER_INFO, {userId:"MAL001"}).then(data => this.updateLogonStatus(data))

        this.updateLogonStatus = this.updateLogonStatus.bind(this); 

    }

    updateLogonStatus(data){

        this.props.UPDATEUSERINFO(data)

        this.props.UPDATEUSERID(this.state.loggedOnUserId)

        this.setState({logOnSuccess: true})

    }


    render(){
        return(
            <div>
            {
            this.state.logOnSuccess

            ?
                <div>
                    <Contribution userId={this.state.loggedOnUserId}/>
                </div>

            :
                <div>Hello world </div>
            }
            </div>
            
        )
    }

}


export default connect(null, {UPDATEUSERINFO, UPDATEUSERID})(LoginPage);
