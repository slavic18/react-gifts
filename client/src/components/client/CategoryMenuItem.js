import React from 'react';
import {connect} from 'react-redux';
import { Link } from "react-router";


class CategoriesMenuItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const category = this.props.category;
        return (
            <li className={category._id == this.props.activeCategory._id ? 'active' : ''}>
                <Link to={ '/category/' + category._id} key={category._id}>
                    {category.title}
                </Link>
            </li>
        )
    }
}


// export the connected class
function mapStateToProps(state) {
    return {
        activeCategory: state.category.activeCategory || []
    }
}


export default connect(mapStateToProps)(CategoriesMenuItem);