import React from "react";
import "whatwg-fetch";
import {connect} from 'react-redux';
import LeftSidebar from './LeftSidebar';
// app component
class App extends React.Component {
    constructor() {
        super();
        this._updateGiftsList = this._updateGiftsList.bind(this);
    }

    componentDidUpdate() {
        if (typeof this.props.params.category_id !== 'undefined') {
            let currentCategory;
            this.props.categories.map((item)=> {
                if (item._id === this.props.params.category_id) {
                    currentCategory = item;
                }
            });
            this.props.dispatch({type: 'SET_ACTIVE_CATEGORY', category: currentCategory});
            this._updateGiftsList();
        }
    }

    _updateGiftsList() {
        let categoryId = this.props.params.category_id;
        fetch('http://localhost:9000/api/giftsByCategory/?category_id=' + categoryId, {
            method: 'GET',
        }).then(function (response) {
            return response.json();
        }).then((data) => {
            this.props.dispatch({
                type: 'GET_GIFTS',
                gifts: data
            })
        });
    }

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