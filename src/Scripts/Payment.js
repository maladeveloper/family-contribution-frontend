import React from 'react';
import {getUserInfo, getUserId} from './Redux/Selectors'; 
import { connect } from "react-redux";
import {webFuncInteraction, backendWebVars} from "./BackendIneterface";
import NotPaidPage from "./Components/NotPaidPage";
import PaidPage from "./Components/PaidPage";
var deepEqual = require('deep-equal')

class Payment extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            payInfo: false,
        }

        this.setPaymentInfo = this.setPaymentInfo.bind(this)
    }

    componentDidMount(){this.setPaymentInfo()}

    componentWillReceiveProps(){this.setPaymentInfo()}



    setPaymentInfo(){

        webFuncInteraction(backendWebVars.PAY_INFO, {date:this.props.chosenDate}).then(data =>this.setState({payInfo:data, submitCounter: this.state.submitCounter+1}))

    }


    render(){

        return(
            <div>
                { this.state.payInfo
                    
                ?
                    [
                    <div>
                        {
                        this.state.payInfo.allPaid

                            ?
                            
                            <div><PaidPage payInfo={this.state.payInfo} submitCounter={this.state.submitCounter}/></div>

                            :

                            <div>
                                <NotPaidPage users={this.state.payInfo.notPaidUsers}/>
                            </div>
                        }
                    </div>
                    ]
                :
                    <div>Loading</div>
                    
                
                }
            </div>
        )
    }



}


export default connect(state => ( { userInfo: getUserInfo(state), userId:getUserId(state)} ))(Payment);