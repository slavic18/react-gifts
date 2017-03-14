import React from "react";
import "whatwg-fetch";
import {connect} from 'react-redux';
import LeftSidebar from './LeftSidebar';
// app component
class App extends React.Component {

    // render
    render() {
        return (
            <div className="main-wrapper">
                <div className="topbar">
                    <div className="topbar-left">
                        <div className="logo">
                            <h1><a href="#"><img src="/assets/img/gifts-logo.png" alt="Logo"/></a></h1>
                        </div>
                        <button className="button-menu-mobile open-left">
                            <i className="fa fa-bars"/>
                        </button>
                    </div>
                    <div className="navbar navbar-default" role="navigation">
                        <div className="container">
                            <div className="navbar-collapse2">
                            </div>
                        </div>
                    </div>
                </div>
                <LeftSidebar/>
                <div className="content-page">
                    <div className="content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

// export the connected class
function mapStateToProps(state) {
    return {
        categories: state.category.categories || []
    };
}


export default connect(mapStateToProps)(App);