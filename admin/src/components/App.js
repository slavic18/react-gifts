import React from "react";
import "whatwg-fetch";
import {connect} from 'react-redux';
// app component
class App extends React.Component {
    constructor() {
        super();
        this.updateCategoriesList = this.updateCategoriesList.bind(this);
        this._updateGiftsList = this._updateGiftsList.bind(this);
        this.toggleList = this.toggleList.bind(this);
        this.state = {
            showCategories:false,
            showGifts: false,
        }
    }
    componentDidMount() {
        fetch('http://localhost:9000/api/categories/', {
            method: 'GET',
        }).then(function (response) {
            return response.json();
        }).then(this.updateCategoriesList);
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

    updateCategoriesList(data) {
        this.props.dispatch({type: 'GET_CATEGORIES', data});
    }
    toggleList(e) {
        var list = e.target.getAttribute('data-list');
        this.state[list] = !this.state[list];
        this.setState(this.state);
    }

    // render
    render() {
        return (
            <div className="main-wrapper">
                <div className="topbar">
                    <div className="topbar-left">
                        <div className="logo">
                            <h1><a href="#"><img src="assets/img/logo.png" alt="Logo"/></a></h1>
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
                <div className="left side-menu">
                    <div className="sidebar-inner slimscrollleft">
                        <form role="search" className="navbar-form">
                            <div className="form-group">
                                <input type="text" placeholder="Search" className="form-control"/>
                                <button type="submit" className="btn search-button">
                                    <i className="fa fa-search"/>
                                </button>
                            </div>
                        </form>
                        <div className="clearfix"></div>
                        <hr className="divider"/>
                        <div className="clearfix"></div>
                        <div id="sidebar-menu">
                            <ul>

                                <li className='has_sub'>
                                    <a href="#" onClick={this.toggleList} data-list="showCategories"
                                       className={this.state.showCategories ? 'subdrop' : ''}>
                                        <i className='icon-feather'/>
                                        <span>Categories</span>
                                        <span className="pull-right">
                                            <i className={'fa ' + (this.state.showCategories ? 'fa-angle-up' : 'fa-angle-down') }/>
                                        </span>
                                    </a>
                                    <ul style={{display: this.state.showCategories ? 'block' : 'none'}}>
                                        <li><a href='alerts.html'><span>Add category</span></a></li>
                                        <li><a href='buttons.html'><span>View categories</span></a></li>
                                    </ul>
                                </li>
                                <li className='has_sub'>
                                    <a onClick={this.toggleList} data-list="showGifts"
                                       className={this.state.showGifts ? 'subdrop' : ''}>
                                        <i className='icon-feather'/>
                                        <span>Gifts</span>
                                        <span className="pull-right">
                                            <i className={'fa ' + (this.state.showGifts ? 'fa-angle-up' : 'fa-angle-down') }/>
                                        </span>
                                    </a>
                                    <ul style={{display: this.state.showGifts ? 'block' : 'none'}}>

                                    <li><a href='alerts.html'><span>Add gift</span></a></li>
                                        <li><a href='buttons.html'><span>View gifts</span></a></li>
                                    </ul>
                                </li>
                            </ul>
                            <div className="clearfix"></div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
                <div className="content-page">
                    <div className="content" style={{paddingTop: 80}}>
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