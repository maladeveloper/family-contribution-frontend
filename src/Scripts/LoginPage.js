import React from 'react';
import Contribution from './Contribution'


class LoginPage extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            //loggedOnUserId: null 
            loggedOnUserId: "MAL001" //FOR NOW LETS ASSUME USER PUT THIS AS ID
        }

        

    }



    render(){
        return(
            <div>
            {
            this.state.loggedOnUserId != null 

            ?
                <div>
                    <Contribution/>
                </div>

            :
                <div>Hello world </div>
            }
            </div>
            
        )
    }

}
export default LoginPage;
