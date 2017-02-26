import React from "react";
import {connect} from 'react-redux';
import 'whatwg-fetch'
import CategoriesList from './CategoriesList';
// app component
class App extends React.Component {
    constructor() {
        super();
        this.updateCategoriesList = this.updateCategoriesList.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:9000/api/categories/', {
            method: 'GET',
        }).then(function (response) {
            return response.json();
        }).then(this.updateCategoriesList);
    }

    updateCategoriesList(data) {
        this.props.dispatch({type: 'GET_CATEGORIES', data});
    }

    // render
    render() {
        return (
            <div>
                <CategoriesList categories={this.props.categories}/>
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