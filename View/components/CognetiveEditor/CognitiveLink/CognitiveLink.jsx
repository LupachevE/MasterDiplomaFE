import React, { Component } from 'react';
import './CognitiveLink.scss';

export default class CognitiveLink extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { soursePosition, destPosition, linkWeight } = this.props;
        const lineStyleObject = {
            strokeWidth: Math.abs(linkWeight) * 10,
            stroke: linkWeight < 0 ? 'blue' : 'red'
        }

        return (
            <line
                style={lineStyleObject}
                x1={soursePosition.x}
                x2={destPosition.x}
                y1={soursePosition.y}
                y2={destPosition.y}
            />
        );
    }
}