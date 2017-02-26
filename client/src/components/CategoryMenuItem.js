import React from 'react';
import {connect} from 'react-redux';

class CategoriesMenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.setActiveCategory = this.setActiveCategory.bind(this);
    }

    setActiveCategory(e) {
        e.preventDefault();
        this.props.dispatch({type: 'SET_ACTIVE_CATEGORY', categoryId: this.props.category._id});
        return false;
    }

    render() {
        const category = this.props.category;
        return (
            <li className={category._id == this.props.activeCategory ? 'active' : ''}>
                <a href={category._id} key={category._id} onClick={this.setActiveCategory}>
                    {category.title}
                </a>
            </li>
        )
    }
}


// export the connected class
function mapStateToProps(state) {
    return {
        // categories: state.category.categories || []
        activeCategory: state.category.activeCategory
    }
}


export default connect(mapStateToProps)(CategoriesMenuItem);