import React from 'react';
import GiftsList from "./GiftsList";

export default class Gifts extends React.Component {
    render(){
        return (
            <div>
                <h2>Gifts</h2>
                <GiftsList />
            </div>
        );
    }
}