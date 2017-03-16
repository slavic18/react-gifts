import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {FormattedDate} from "react-intl";

class GiftMenuItem extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({
            isChecked: true
        })
    }

    render() {
        const {gift, isChecked, checkListItem} = this.props;

        if (typeof gift.description == 'undefined') {
            gift.description = '';
        }
        let description = gift.description.length > 150 ? gift.description.substr(0, 150) + ' ...' : gift.description,
            dateComponent = '';
        if (typeof gift.updated_at !== 'undefined') {
            dateComponent = <FormattedDate value={gift.updated_at} day="numeric" month="numeric" year="numeric"/>;
        }
        let thumbnailSrc = '//markmusto.com/wp-content/themes/equilibrium/images/layout/no-thumb.gif';
        if (!!gift._thumbnail && typeof gift._thumbnail.path !== 'undefined') {
            thumbnailSrc = '//localhost:9000/' + gift._thumbnail.path
        }

        let categoryName = !!gift._category ? gift._category.title : "Без категории";
        return (
            <tr className="unread" key={gift._id}>
                <td style={{width: 20}}>
                    <div>
                        <input type="checkbox" id={'gift_id_' + gift._id}
                               data-key={gift._id}
                               className="regular-checkbox"
                               checked={isChecked}
                               onChange={checkListItem}/>
                        <label htmlFor={'gift_id_' + gift._id}/>
                    </div>
                </td>
                <td style={{width: 40}} className="table-thumbnail">
                    <img src={thumbnailSrc}/>
                </td>
                <td>
                    <Link to={ '/gifts/' + gift._id}>
                        {gift.title}
                    </Link>
                </td>
                <td>
                    <Link to={ '/gifts/' + gift._id}>
                        {categoryName}
                    </Link>
                </td>
                <td>
                    <Link to={ '/gifts/' + gift._id}>
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
        // gifts: state.gift.gifts || []
    }
}

export default connect(mapStateToProps)(GiftMenuItem);