import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Contribution from './Contribution';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class HomeNavbar extends React.Component{
    render(){  
        
        return(
            <>
            <Router>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand >Family Contribution</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/" >Home</Nav.Link>
                        <Nav.Link href="/contribution">Contribution</Nav.Link>
                        <Nav.Link href="/requests">Requests</Nav.Link>
                    </Nav>
                </Navbar>
            <div>
              <Switch>
                <Route exact path="/">
                  <div>Hello</div>
                </Route>
                <Route path="/contribution">
                  <Contribution userId={this.props.userId} />
                </Route>
                <Route path="/requests">
                  <div>Requests</div>
                </Route>
              </Switch>
            </div>
          </Router>

            </>
        )
    }
}


export default HomeNavbar; 