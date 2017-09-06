import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

// Import header component
import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

// create App component
class App extends Component {
    // Once component is rendered on screen, attempt load action creator for fetch user
    componentDidMount() {
        // access actions in form of props
        // goes to ../actions/index.js
        this.props.fetchUser();
    }
    // jsx
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>);
    }
};

// Export App
// Makes actions assigned to App component as props
export default connect(null, actions)(App);