import React from "react";
import "../stylesheets/main.scss";
import {socketConnect} from 'socket.io-react';
import store from 'store';
import {connect} from 'react-redux';
import LeadForm from './LeadForm';
import UserStatus from './UserStatus';
import ProjectsList from './rooms/ProjectsList';
import RoomsActions from './rooms/RoomsActions';
import RoomsList from './rooms/RoomsList';
import OpenedRoom from './rooms/OpenedRoom';
import {storeConstants} from '../storeConstants';
import {chatApi} from '../api/chatApi';

// app component
class App extends React.Component {
    constructor() {
        super();
        this._authenticated = this._authenticated.bind(this);
    }

    componentDidMount() {
        this.props.socket.on('authenticated', this._authenticated);
    }

    _authenticated(data) {
        if (data.userId) {
            store.set(storeConstants.ADMIN_ID, data.userId);
            store.set(storeConstants.USER_STATUS, data.status);
        }
        if (data.status) {
            store.set(storeConstants.CURRENT_STATE, 'new');
        }
        this.props.dispatch({type: 'AUTHENTICATED', data});
        document.getElementsByTagName('body')[0].className = document.getElementsByTagName('body')[0].className.replace('show-spinner', '');
        chatApi.getCurrentState(this.props.socket);
    }

    // render
    render() {
        return (
            <div className="clients_chat_wrapper">
                <div className="clients_chat_header">
                    <div className="clients_chat_left_col">
                        <UserStatus/>
                    </div>
                    <div className="clients_chat_center_col">
                        <div className="clients_chat_user_active_conversation">
                            <ProjectsList/>
                            <RoomsActions/>
                        </div>
                    </div>
                    <div className="clients_chat_right_col">
                        <h2 className="clients_chat_bid_form_title">Сформируйте оффлайн заявку</h2>
                    </div>
                </div>
                <div className="clients_chat_body">
                    <RoomsList/>
                    <div className="clients_chat_center_col">
                        <OpenedRoom/>
                    </div>
                    <div className="clients_chat_right_col scroll_list">
                        <LeadForm/>
                    </div>
                </div>
            </div>
        )
    }
}



// export the connected class
function mapStateToProps(state) {
    return {
        userStatus: state.userStatus || false,
    };
}


export default socketConnect(connect(mapStateToProps)(App));