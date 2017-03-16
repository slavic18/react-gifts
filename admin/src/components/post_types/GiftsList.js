import React from "react";
import GiftMenuItem from "./GiftMenuItem";
import {connect} from "react-redux";
import {Pagination} from "react-bootstrap";
import {push} from "react-router-redux";

class GiftsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItems: [],
        };
        this.selectAllItems = this.selectAllItems.bind(this);
        this.updateSelectedItems = this.updateSelectedItems.bind(this);
        this.removeItems = this.removeItems.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_GIFTS'});
    }

    selectAllItems(e) {
        let selectedItems = [];
        if (e.target.checked) {
            this.props.gifts.map((gift) => {
                selectedItems.push(gift['_id']);
            });
        }
        this.setState({selectedItems});
    }

    updateSelectedItems(e) {
        let selectedItems = this.state.selectedItems;
        if (e.target.checked) {
            selectedItems.push(e.target.dataset.key);
        } else {
            selectedItems = selectedItems.filter(value => String(value) != String(e.target.dataset.key));
        }
        this.setState({selectedItems});
    }

    removeItems() {
        this.props.dispatch({type: 'REMOVE_GIFTS', items: this.state.selectedItems});
    }

    changePage(page) {
        this.props.dispatch(push(window.location.pathname + '?page=' + page));
    }


    render() {
        const gifts = this.props.gifts;
        const {page} = this.props;
        const perPage = 20;
        const startOffset = (page - 1) * perPage;
        let pages = Math.ceil(gifts.length / perPage),
            startCount = 0;

        return (
            <div>
                <div className="data-table-toolbar">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="btn-toolbar" role="toolbar">
                                <div className="btn-group">
                                    <div>
                                        <input type="checkbox" id="select-all" onChange={this.selectAllItems}
                                               className="regular-checkbox"/>
                                        <label htmlFor="select-all"/>
                                    </div>
                                </div>

                                <div className="btn-group hidden-xs">
                                    <a className="btn btn-primary" onClick={this.removeItems}>
                                        <i className="fa fa-trash-o"/>
                                    </a>
                                </div>
                                <div className="btn-group hidden-xs">
                                    <a onClick={() => {
                                        window.location.reload()
                                    }} className="btn btn-primary">
                                        <i className="fa fa-undo"/>
                                    </a>
                                </div>

                            </div>
                        </div>
                        <div className="col-sm-4 hidden-xs">
                            <div className="pull-right">
                                <Pagination className="users-pagination no-margin" bsSize="medium" maxButtons={10} first last next
                                            prev boundaryLinks items={pages} activePage={page} onSelect={this.changePage}/>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="mail-list">
                    <div className="table-responsive">
                        <table className="table table-hover table-message">
                            <tbody>
                            {gifts.map((value, index) => {
                                if (index >= startOffset && startCount < perPage) {
                                    startCount++;
                                    let isChecked = false;
                                    let activeItems = this.state.selectedItems.filter(item => {
                                        return String(item) == String(value._id)
                                    });
                                    if (activeItems.length) {
                                        isChecked = true;
                                    }

                                    return (
                                        <GiftMenuItem
                                            key={index}
                                            gift={value}
                                            checkListItem={this.updateSelectedItems}
                                            isChecked={isChecked}/>
                                    )
                                }
                            })}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center">
                        <Pagination className="users-pagination " bsSize="medium" maxButtons={10} first last next
                                    prev boundaryLinks items={pages} activePage={page} onSelect={this.changePage}/>
                    </div>

                </div>
            </div>
        )
    }
}

// export the connected class
function mapStateToProps(state) {
    console.log(state);
    return {
        gifts: state.gifts.gifts || [],
        page: Number(state.routing.locationBeforeTransitions.query.page) || 1,
    };
}
export default connect(mapStateToProps)(GiftsList);


