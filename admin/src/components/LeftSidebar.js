import React from "react";
import { Link } from "react-router";

export default class LeftSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.toggleList = this.toggleList.bind(this);
        this.state = {
            showCategories: false,
            showGifts: false,
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
                                <a href="#" onClick={this.toggleList} data-list="showCategories"
                                   className={this.state.showCategories ? 'subdrop' : ''}>
                                    <i className='icon-feather'/>
                                    <span>Categories</span>
                                    <span className="pull-right">
                                            <i className={'fa ' + (this.state.showCategories ? 'fa-angle-up' : 'fa-angle-down') }/>
                                        </span>
                                </a>
                                <ul style={{display: this.state.showCategories ? 'block' : 'none'}}>
                                    <li>
                                        <Link to="/categories/add_new" ><span>Add category</span></Link>
                                    </li>
                                    <li>
                                        <Link to="/categories/">
                                            <span>View categories</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className='has_sub'>
                                <a onClick={this.toggleList} data-list="showGifts"
                                   className={this.state.showGifts ? 'subdrop' : ''}>
                                    <i className='icon-feather'/>
                                    <span>Gifts</span>
                                    <span className="pull-right">
                                            <i className={'fa ' + (this.state.showGifts ? 'fa-angle-up' : 'fa-angle-down') }/>
                                        </span>
                                </a>
                                <ul style={{display: this.state.showGifts ? 'block' : 'none'}}>

                                    <li><a href='alerts.html'><span>Add gift</span></a></li>
                                    <li><a href='buttons.html'><span>View gifts</span></a></li>
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