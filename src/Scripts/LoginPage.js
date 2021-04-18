import React from 'react';
import {webFuncInteraction, backendWebVars} from "./BackendIneterface";



class LoginPage extends React.Component{

    constructor(props){
        super(props)

        this.captureUserId = this.captureUserId.bind(this);

        this.state={loadingAuth: false}

    }

    captureUserId(){

        var chosenId = document.getElementById("userInputId").value;

        this.setState({loadingAuth:true})

        //Check if the id is acceptable
        webFuncInteraction(backendWebVars.AUTH, {userId:chosenId}).then((userStatus) =>{

            this.setState({loadingAuth:false})

            if(userStatus){
                
                this.props.setUserId(chosenId)
            }
            else{
                alert("This ID is incorrect!")
            }
        })

    }





    render(){

        return(

            
            <div style={{"display":"flex", "flexDirection":"coloumn", "alignItems":"center", "height":"100vh", "justifyContent":"center"}}>
                {
                !this.state.loadingAuth
                    ?
                        <div style={{"display":"flex", "flexDirection":"coloumn", "borderStyle":"solid", "borderWidth":"1px", "justifyContent":"center", "padding":"10%"}}>
                            <div style={{"display":"flex", "flexDirection":"row"}} >
                                <label>Input ID:</label>
                                <input id={"userInputId"} onKeyPress={event=>{ if(event.key==="Enter"){this.captureUserId()}}}></input>
                            </div>
                            <button onClick={this.captureUserId}>Enter</button>
                        </div>
                    :
                        <div>Authorising ID...</div>
                }
            </div>

            )


    }



}


export default LoginPage;