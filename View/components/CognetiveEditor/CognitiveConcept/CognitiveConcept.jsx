import React, { Component } from 'react';
import './CognitiveConcept.scss';

export default class CognitiveConcept extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { conceptData } = this.props;
        return (
            <div
                style={{
                    top: `${conceptData.position.y}px`,
                    left: `${conceptData.position.x}px`
                }}
                className='concept'
                id={conceptData.id}
            >
                <p>
                    {
                        conceptData.name
                    }
                </p>
            </div>
        )
    }
}