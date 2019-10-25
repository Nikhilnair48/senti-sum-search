import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { HomePage } from './HomePage';
import { Navbar, Nav } from 'react-bootstrap';
import { history } from './_helpers';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.renderNav = this.renderNav.bind(this);
  }

  renderNav() {
    return (
      <Nav className="ml-auto">
        <Nav.Item>
            <Nav.Link onClick="_blank">
                Source Code
            </Nav.Link>
        </Nav.Item>
    </Nav>
    )
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/">
            <div className="sentisum-container">
              <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                <Navbar.Brand href="/">SentiSum Search</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse>
                    {this.renderNav()}
                  </Navbar.Collapse>
                </Navbar>
                <div className="sentisum-content">
                  <Route component={HomePage} />
                </div>
              </div>
            </Route>
          </Switch>
        </Router>
    );
  }
}

function mapState(state) {
  return { state };
}

const actionCreators = {
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };