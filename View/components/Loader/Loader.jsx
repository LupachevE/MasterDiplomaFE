import React, { Component } from 'react';

export default class Loader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="loadContainer"><img src="/assets/images/loader.gif" /></div>
        )
    }
}