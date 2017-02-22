import React from 'react';
import {socketConnect} from 'socket.io-react';
class ProjectsList extends React.Component {
    render() {
        let projects = [['test1', 'test1'], ['test2', 'test2'], ['test3', 'test3'], ['test4', 'test4']];
        let projectsList = projects.map((val, key) => <option key={key} value={val[0]}>{val[1]}</option>);
        return (
            <div className="clients_chat_user_info">
                <span className="select_span">Выберите проект</span>
                <select id="selectAllProjects">
                    {projectsList}
                </select>
            </div>
        )
    }
}

export default socketConnect(ProjectsList);