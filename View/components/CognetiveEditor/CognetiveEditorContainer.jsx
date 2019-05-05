import React, { Component } from 'react';
import CognitiveCardClass from '../../../Model/CognitiveCardClass';
import CognitiveConcept from './CognitiveConcept/CognitiveConcept.jsx'

export default class CognetiveEditorContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            card: null,
            isError: false,
            error: null,
            isDragging: false
        }
    }

    componentDidMount() {
        const Card = new CognitiveCardClass();
        Card.getDate().then(() => {
            this.setState({
                isLoaded: true,
                cardData: Card.data
            });
        },
        error => {
            this.setState({
                isLoaded: true,
                isError: true,
                error: error
            });
        });
    }

    get content() {
        const { isError, error, cardData } = this.state;
        return (
            !isError
            ? <div>{
                cardData.concepts.map((el, index) =>
                    <CognitiveConcept
                        key={`concept${index}`}
                        conceptData={el}
                    />
                )
            }</div>
            : <div>{error}</div>
        )
    }

    //#region DragAndDrop
    onMouseDownHandler(e) {
        const { isDragging } = this.state;
        if (!isDragging) {
            const { target } = e;
            if (target.className.indexOf('concept') >= 0) {
                this.setState({
                    isDragging: true
                });
            }
        }
    }

    onMouseMoveHandler(e) {
        const { isDragging } = this.state;
        if (isDragging) {
            console.log(e.clientX + ' ' + e.clientY);
        }
    }

    onMouseUpHandler() {
        const { isDragging } = this.state;
        if (isDragging) {
            this.setState({
                isDragging: false
            });
        }
    }
    //#endregion

    render() {
        const { isLoaded } = this.state;
        return (
            <div
                onMouseMove={this.onMouseMoveHandler.bind(this)}
                onMouseDown={this.onMouseDownHandler.bind(this)}
                onMouseUp={this.onMouseUpHandler.bind(this)}
            >
                {
                    !isLoaded
                    ? <img src="assets/images/load_indicator.gif" />
                    : this.content
                }
            </div>
        )
    }
}