import React, { Component } from 'react';

class Header extends Component {
    // renderContent() {
    //     switch (this.props.auth) {
    //         case null:
    //             return;
    //         case false:
    //             return <li><a href="/auth/google">Login With Google</a></li>;
    //         default:
    //             return [
    //                 <li key="1"><Payments /></li>,
    //                 <li key="3" style={{ margin: '0 10px' }}>
    //                     Credits: {this.props.auth.credits}
    //                 </li>,
    //                 <li key="2"><a href="/api/logout">Logout</a></li>
    //             ];
    //     }
    // }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    Header
                </div>
            </nav>
        );
    }
}

export default Header;