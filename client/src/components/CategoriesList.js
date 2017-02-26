import React from 'react';
import {connect} from 'react-redux';
import CategoryMenuItem from './CategoryMenuItem';

class CategoriesList extends React.Component {
    constructor(props) {
        super(props);

    }
    render(){
        const categories = this.props.categories;
        return(
            <ul className="menu">
                {categories.map((value,index) => {
                    return (<CategoryMenuItem key={index} category={value}/>)
                })}

            </ul>
        )
    }
}


// export the connected class
function mapStateToProps(state) {
    return {
        // categories: state.category.categories || []
    };
}


export default connect(mapStateToProps)(CategoriesList);