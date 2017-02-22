import React from 'react';
import {socketConnect} from 'socket.io-react';

class RoomsActions extends React.Component {
    render(){
        return(
            <ul className="manager_action_btns">
                <li>
                    <a href="#" data-chat-container="close-chat-room">
                        Перекинуть в чат бот
                    </a>
                </li>
                <li>
                    <a href="#" data-chat-container="show-thank-you-page">
                        thx page
                    </a>
                </li>
                <li>
                    <a href="#" data-chat-container="ban-24">
                        Бан 24 часа
                    </a>
                </li>
            </ul>
        )
    }
}
export default socketConnect(RoomsActions);