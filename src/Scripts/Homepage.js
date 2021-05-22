import React from 'react';
import HomeNavbar from './HomeNavbar'

class Homepage extends React.Component{

    constructor(props){super(props)}

 

    render(){  
        
        return(
            <div>
                <HomeNavbar userId={this.props.userId} />
            </div>
        )
    }



}


export default Homepage; 