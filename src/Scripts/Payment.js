import React from 'react';
import {getUserInfo, getUserId} from './Redux/Selectors'; 
import { connect } from "react-redux";
import {webFuncInteraction, backendWebVars} from "./BackendIneterface";
import NotPaidPage from "./Components/NotPaidPage";


class Payment extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            payInfo: false,

        }

        this.setPaymentInfo = this.setPaymentInfo.bind(this)
    }

    componentDidMount(){this.setPaymentInfo()}

    componentDidUpdate(){this.setPaymentInfo()}

    shouldComponentUpdate(nextProps, nextState){

        if(JSON.stringify(this.props) === JSON.stringify(nextProps)){//Checks the counter to see if user has submitted a new submition


            if(JSON.stringify(this.state) === JSON.stringify(nextState)){//Not a new submission but false because state is the same.
                
                return false

            }
        }
        else{ //If there is a new submission update the counter

            this.setPaymentInfo()
        }

        return true
    }



    setPaymentInfo(){

        webFuncInteraction(backendWebVars.PAY_INFO, {date:this.props.chosenDate}).then(data =>this.setState({payInfo:data}))

    }


    render(){

        console.log(this.state.payInfo)
        return(
            <div>
                { this.state.payInfo
                    
                ?
                    [
                    <div>
                        {
                        this.state.payInfo.allPaid

                            ?
                            
                            <div>Paid Page</div>

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