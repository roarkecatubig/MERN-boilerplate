import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    // Called from inside ul
    renderContent() {
        // Switch through auth value from props
        switch (this.props.auth) {
            case null:
                // If null return blank
                return;
            case false:
                // if false, meaning user is not logged in, return login with google option
                return <li><a href="/auth/google">Login With Google</a></li>;
            default:
                // If logged in pass data
                return [
                    // Payments components
                    // <li key="1"><Payments /></li>,
                    // access credits of user
                    <li key="3" style={{ margin: '0 10px' }}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    // option for user to logout
                    <li key="2"><a href="/auth/logout">Logout</a></li>
                ];
        }
    }

    render() {
        // If this.props.auth exists, link logo to /surveys otherwise to landing page
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to={this.props.auth ? '/surveys' : '/'} className="left brand-logo">
                        MERN BOILERPLATE
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

// Get's called with the entire state object out of the redux store
// auth property set within reducers/index 
function mapStateToProps({ auth }) {
    // return object passed to header as props
    // This will pass back returned value from reducers/authReducer
    return { auth };
}

export default connect(mapStateToProps)(Header);