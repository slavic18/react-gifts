import React from "react";
import {connect} from 'react-redux';
import 'whatwg-fetch'
import CategoriesList from './CategoriesList';
import {Link} from 'react-router';
// app component
class App extends React.Component {
    constructor() {
        super();
        this.updateCategoriesList = this.updateCategoriesList.bind(this);
        this._updateGiftsList = this._updateGiftsList.bind(this);
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

    // render
    render() {
        return (
            <div>
                <Link to="/" className="logo-wrapper">
                    <img src="/img/Gift-High-Quality-PNG.png"/>
                </Link>
                <CategoriesList categories={this.props.categories}/>
                <div className="main-content">
                    {this.props.children}
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