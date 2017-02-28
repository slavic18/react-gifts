import React from 'react';
import 'whatwg-fetch';
import {connect} from 'react-redux';

class Category extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {

    }


    render() {
        return (
            <div>
                Category:
                {this.props.activeCategory.title}
                <ul>
                    {this.props.gifts.map((item) => {
                        return (<li key={item._id}>
                            <div className="title">
                                {item.title}
                            </div>
                            <div className="description">
                                {item.description}
                            </div>
                        </li>)
                    })}
                </ul>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        gifts: state.category.gifts || [],
        activeCategory: state.category.activeCategory || []
    }
}
export default connect(mapStateToProps)(Category);