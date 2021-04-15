import React from 'react';
import './NotPaidPage.css'



class NotPaidPage extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            users:null
        }

    }




    render(){
        return(
            <>
  
                <div>
                    <p>Pending...</p>
                    <div className="not-paid-parent">
                        
                        
                        <p style={{"fontSize":"20px"}}>The following users have not yet submitted their income..</p>

                        <div style={{"display":"flex", "flexDirection":"column", "justifyContent":"center"}}>
                            {this.props.users.map((itemName, index)=> <div style={{"fontSize":"25px", display:"flex", justifyContent:"center"}}><p style={{fontWeight:"bold"}}>{itemName}</p></div>)}
                            
                        </div>
                    </div>
                </div>

            </>
        )
    }



}


export default NotPaidPage;