import Navbar from 'react-bootstrap/Navbar'
import React from 'react';

class Home extends React.Component{

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
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">FamilyContribution</Navbar.Brand>
                    <button>Hello</button>

                </Navbar>
                

                </div>

            </>
        )
    }
}


export default Home;