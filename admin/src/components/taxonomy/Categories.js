import React from "react";
import {connect} from "react-redux";
import CategoriesList from "./CategoriesList";
class Categories extends React.Component {
    constructor(props) {
        super(props);
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

    render() {
        let categories = this.props.categories;
        return (
            <div>
                <h2>Categories</h2>
                <CategoriesList categories={categories}/>
            </div>
        );
    }
}


// export the connected class
function mapStateToProps(state) {
    return {
        categories: state.category.categories || []
    };
}
export default connect(mapStateToProps)(Categories);