import React, { Component } from 'react';
import './CognitiveConcept.scss';

export default class CognitiveConcept extends Component {
    static get conceptHeight() {
        return 60;
    }
    static get conceptWidth() {
        return 100;
    }
    static get textWidth() {
        return 60;
    }
    static get textHeight() {
        return 15;
    }
    static get borderWidth() {
        return 1;
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { conceptData } = this.props;
        const coords = {
            zero: {
                x: conceptData.position.x,
                y: conceptData.position.y
            },
            rightX: parseInt(conceptData.position.x) + CognitiveConcept.conceptWidth,
            bottomY: parseInt(conceptData.position.y) + CognitiveConcept.conceptHeight,
            textX: parseInt(conceptData.position.x) + CognitiveConcept.conceptWidth / 2 - CognitiveConcept.textWidth / 2 + CognitiveConcept.borderWidth,
            textY: parseInt(conceptData.position.y) + CognitiveConcept.conceptHeight / 2 + 2 * CognitiveConcept.borderWidth
        }
        return (
            <g
                className='concept'
            >
                <polygon
                    points={`${coords.zero.x},${coords.zero.y}
                        ${coords.rightX},${coords.zero.y}
                        ${coords.rightX},${coords.bottomY}
                        ${coords.zero.x},${coords.bottomY}`}
                    id={conceptData.id}
                />
                <text x={coords.textX} y={coords.textY}>
                    {conceptData.name}
                </text>
            </g>
        )
    }
}