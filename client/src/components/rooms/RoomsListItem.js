import React from 'react';
import store from 'store';
import {socketConnect} from 'socket.io-react';
import {connect} from 'react-redux';
import {storeConstants} from '../../storeConstants';


class RoomListItem extends React.Component {
    constructor() {
        super();
        this._openRoom = this._openRoom.bind(this);
        this.state = {};
        this._closeRoom = this._closeRoom.bind(this);
    }

    componentDidMount() {
        const room = this.props.room || [];
        this.setState({
            lastMessage: store.get(room['_id'] + storeConstants.LAST_MESSAGE) || '',
            lastMessageTime: store.get(room['_id'] + storeConstants.LAST_MESSAGE_TIME) || '',
            currentWriting: store.get(room['_id'] + storeConstants.CURRENT_WRITING) ? 'clients_chat_user_writing' : '',
            newMessagesCount: store.get(room['_id'] + storeConstants.NEW_MESSAGES) || 0,
            newMessagesClass: this.newMessagesCount ? 'clients_chat_new_message_active' : '',
            adminWroteMessageClass: store.get(room['_id'] + storeConstants.ADMIN_WROTE_MESSAGE) ? 'white-bg' : '',
            roomUrl: store.get(room['_id'] + storeConstants.ROOM_URL) || ''
        });
        if (this.props.current) {
            this.props.socket.emit('openRoom', {roomId: room['_id']});
        }
    }

    _openRoom(e) {
        if (e.target.className.indexOf('js-close-room') >= 0) {
            return;
        }
        const room = this.props.room;
        store.set(storeConstants.CURRENT_ROOM, room['_id']);
        this.props.dispatch({
            type: 'UPDATE_CURRENT_ROOM_ID',
            room_id: room['_id']
        });

        this.props.socket.emit('openRoom', {roomId: room['_id']});
    }

    _closeRoom() {
        const room = this.props.room;
        let currentRoomId = store.get(storeConstants.CURRENT_ROOM),
            isCurrentRoom = currentRoomId == room['_id'];
        if (isCurrentRoom) {
            store.remove(storeConstants.CURRENT_ROOM);
        }
        this.props.dispatch({
            type: 'CLOSE_ROOM',
            room_id: room['_id'],
            current: isCurrentRoom
        });

        this.props.socket.emit('closeRoom', {roomId: room['_id']});
    }

    render() {
        const room = this.props.room;
        let currentClass = this.props.current ? 'clients_chat_user_active' : '';

        return (
            <li key={room['_id']} data-roomid={room['_id']} data-slug={room['name']}
                className={'js-open-room ' + this.state.adminWroteMessageClass + ' ' + currentClass}
                onClick={this._openRoom}
            >
                <a href="#" className="clients_chat_list_item ">
                    <div className="clients_chat_user_img">
                        <img src="img/account/avatar_male.png" alt=""/>
                        <span className="clients_chat_status online"/>
                    </div>
                    <div className="clients_chat_user_name">
                        <h2> {room['name']}</h2>
                        <h2 className="js-put-url">{this.state.roomUrl}</h2>
                        <div className={'clients_chat_user_last_message ' + this.state.currentWriting}>
                            <span className="message">{this.state.lastMessage}</span>
                            <span className="writing">Пишет вам сообщение...</span>
                        </div>
                    </div>
                    <div className={'clients_chat_user_time ' + this.state.newMessagesClass}>
                        <span className="time">{this.state.lastMessageTime}</span>
                        <span className="clients_chat_new_message">{this.state.newMessagesCount}</span>
                    </div>
                </a>
                <a className="js-close-room close-room" onClick={this._closeRoom}>x</a>
            </li>
        )
    }
}
function mapStateToProps(state) {
    return {
        currentRoomClass: 'clients_chat_user_active',
    }
}

export default socketConnect(connect(mapStateToProps)(RoomListItem));