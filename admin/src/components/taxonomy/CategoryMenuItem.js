import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {FormattedDate} from "react-intl";

class CategoriesMenuItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const category = this.props.category;
        let description = category.description.length > 150 ? category.description.substr(0, 150) + ' ...' : category.description,
            dateComponent = '';
        if (typeof category.updated_at !== 'undefined') {
            dateComponent = <FormattedDate value={category.updated_at} day="numeric" month="numeric" year="numeric"/>;

        }
        return (
            <tr className="unread" key={category._id}>
                <td style={{width: 20}}>
                    <input type="checkbox" className="rows-check"/>
                </td>
                <td>
                    <Link to={ '/categories/' + category._id}>
                        {category.title}
                    </Link>
                </td>
                <td>
                    <Link to={ '/categories/' + category._id}>
                        {description}
                    </Link>
                </td>
                <td>
                    {dateComponent}
                </td>
            </tr>
        )
    }
}

// export the connected class
function mapStateToProps(state) {
    return {
        // categories: state.category.categories || []
        activeCategory: state.category.activeCategory || []
    }
}

export default connect(mapStateToProps)(CategoriesMenuItem);