import React from "react";
import {Link} from "react-router";

class LeftSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.toggleList = this.toggleList.bind(this);
        this.state = {
            showCategories: false,
            showGifts: false,
        };
    }

    componentDidMount() {
        // check if categories tab is active
        let currentLocation = this.context.router.getCurrentLocation().pathname,
            parsedLocation = currentLocation.split('/');
        if (parsedLocation.length > 2 && parsedLocation[2] == 'categories') {
            this.setState({
                showCategories: true
            });
        }
        if (parsedLocation.length > 2 && parsedLocation[2] == 'gifts') {
            this.setState({
                showGifts: true
            });
        }
    }

    toggleList(e) {
        var list = e.target.getAttribute('data-list');
        this.state[list] = !this.state[list];
        this.setState(this.state);
    }

    render() {
        return (
            <div className="left side-menu">
                <div className="sidebar-inner slimscrollleft">
                    <form role="search" className="navbar-form">
                        <div className="form-group">
                            <input type="text" placeholder="Search" className="form-control"/>
                            <button type="submit" className="btn search-button">
                                <i className="fa fa-search"/>
                            </button>
                        </div>
                    </form>
                    <div className="clearfix"></div>
                    <hr className="divider"/>
                    <div className="clearfix"></div>
                    <div id="sidebar-menu">
                        <ul>
                            <li className='has_sub'>
                                <a onClick={this.toggleList} data-list="showCategories"
                                   className={this.state.showCategories ? 'subdrop' : ''}>
                                    <i className='icon-feather'/>
                                    <span>Categories</span>
                                    <span className="pull-right">
                                            <i className={'fa ' + (this.state.showCategories ? 'fa-angle-up' : 'fa-angle-down') }/>
                                        </span>
                                </a>
                                <ul style={{display: this.state.showCategories ? 'block' : 'none'}}>
                                    <li>
                                        <Link to="/admin/categories/add_new" activeClassName="active">
                                            <span>Add category</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/categories/" activeClassName="active">
                                            <span>View categories</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className='has_sub'>
                                <a onClick={this.toggleList} data-list="showGifts"
                                   className={this.state.showGifts ? 'subdrop' : ''}>
                                    <i className='icon-gift'/>
                                    <span>Gifts</span>
                                    <span className="pull-right">
                                        <i className={'fa ' + (this.state.showGifts ? 'fa-angle-up' : 'fa-angle-down') }/>
                                    </span>
                                </a>
                                <ul style={{display: this.state.showGifts ? 'block' : 'none'}}>
                                    <li>
                                        <Link to="/admin/gifts/add_new" activeClassName="active">
                                            <span>Add gift</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/gifts/" activeClassName="active">
                                            <span>View gifts</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <div className="clearfix"></div>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        )
    }
}

LeftSidebar.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default LeftSidebar;