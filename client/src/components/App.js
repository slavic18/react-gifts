import React from "react";
import {connect} from 'react-redux';
import 'whatwg-fetch'
// app component
class App extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        fetch('http://localhost:9000/categories')
            .then(function(response) {
                return console.log(response);
            }).then(function(body) {
            document.body.innerHTML = body
        })

        // this.props.dispatch({type: 'AUTHENTICATED', data});
    }

    // render
    render() {
        return (
            <div>Hello world</div>
        )
    }
}


// export the connected class
function mapStateToProps(state) {
    return state;
}


export default connect(mapStateToProps)(App);