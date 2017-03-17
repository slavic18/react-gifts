import React from "react";
import {connect} from "react-redux";
import "whatwg-fetch";
import CategoriesList from "./CategoriesList";
import {Link} from "react-router";
// app component
class App extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.props.dispatch({type: 'FETCH_CATEGORIES'});
    }

    componentDidUpdate() {
        const {dispatch} = this.props;
        if (typeof this.props.params.category_id !== 'undefined') {
            let currentCategory;
            this.props.categories.map((item)=> {
                if (item._id === this.props.params.category_id) {
                    currentCategory = item;
                }
            });
            if(currentCategory) {
                dispatch({type: 'SET_ACTIVE_CATEGORY', category: currentCategory});
                dispatch({type: 'FETCH_GIFTS_BY_CATEGORY', category: currentCategory._id});
            }
        }
    }

    // render
    render() {
        return (
            <div>
                <Link to="/" className="logo-wrapper">
                    <img src="/images/Gift-High-Quality-PNG.png"/>
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