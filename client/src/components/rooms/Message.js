import React from 'react';
import store from 'store';
// import Moment from 'react-moment';
import striptags from 'striptags';
import {storeConstants} from '../../storeConstants';

export default class Message extends React.Component {
    render() {
        const message = this.props.message;
        let text = striptags(message.message),
            currentId = store.get(storeConstants.ADMIN_ID),
            authorClass = String(message._userid) === String(currentId) ? 'to_client_message' : 'client_message',
            loadClass = (message.type == 'load') ? 'load_message' : '';
        return (
            <div className={authorClass + ' '}>
                <span className="message_time">
                    {/*<Moment format="HH:mm">{message['date']}</Moment>*/}
                </span>
                <p className={loadClass}>
                    {text}
                </p>
            </div>
        )
    }
}

