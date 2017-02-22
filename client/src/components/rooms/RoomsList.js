import React from 'react';
import {storeConstants} from '../../storeConstants';
import store from 'store';
import {socketConnect} from 'socket.io-react';
import {connect} from 'react-redux';
import RoomListItem from './RoomsListItem'


class RoomsList extends React.Component {
    componentWillMount() {
        this.props.socket.on('getRooms', this._getRooms);
    }

    constructor() {
        super();
        this._getRooms = this._getRooms.bind(this);
    }

    _getRooms(data) {
        this.props.dispatch({
            type: 'GET_ROOMS',
            data,
        });
    }

    render() {
        return (
            <div className="clients_chat_left_col scroll_list">
                <div className="clients_chat_list_wrap">
                    <ul className="clients_chat_list" data-chat-container="rooms-list">
                        {this.props.rooms.map((room, index) => {
                            return (
                                <RoomListItem key={index} room={room} current={this.props.currentRoom === room['_id'] } />);
                        },this)}
                    </ul>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        rooms: state.chat.rooms || [],
        currentRoom: state.chat.currentRoom || store.get(storeConstants.CURRENT_ROOM)
    }
}
export default socketConnect(connect(mapStateToProps)(RoomsList));