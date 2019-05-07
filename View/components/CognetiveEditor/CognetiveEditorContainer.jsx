import React, { Component } from 'react';
import CognitiveCardClass from '../../../Model/CognitiveCardClass';
import CognitiveConcept from './CognitiveConcept/CognitiveConcept.jsx'
import CognitiveLink from './CognitiveLink/CognitiveLink.jsx'

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

    get links() {
        const { cardData } = this.state;

        return (
            cardData.cognitiveCardLinks.map((el, index) =>
            {
                const sourcePosition = cardData.concepts.filter(e => e.id === el.sourceConcept)[0].position;
                const destPosition = cardData.concepts.filter(e => e.id === el.destinationConcept)[0].position;
                
                return (
                <CognitiveLink
                    ref={el => this[`link${index}`] = el}
                    key={`link${index}`}
                    soursePosition={sourcePosition}
                    destPosition={destPosition}
                    linkWeight={el.connectionWeight}
                />
                )
            })
        )
    }

    get concepts() {
        const { cardData } = this.state;

        return (
            cardData.concepts.map((el, index) =>
                <CognitiveConcept
                    ref={el => this[`concept${index}`] = el}
                    key={`concept${index}`}
                    conceptData={el}
                />
            )
        )
    }

    get content() {
        const { isError, error } = this.state;
        return (
            !isError
            ? <svg
                    height={'1000px'}
                    width={'1000px'}
                    onMouseMove={this.onMouseMoveHandler.bind(this)}
                    onMouseDown={this.onMouseDownHandler.bind(this)}
                    onMouseUp={this.onMouseUpHandler.bind(this)}
                >
                    {this.links}
                    {this.concepts}
                </svg>
            : <div>{error}</div>
        )
    }

    //#region DragAndDrop
    onMouseDownHandler(e) {
        // const { isDragging } = this.state;
        // if (!isDragging) {
        //     const { target } = e;
        //     if (target.className.indexOf('concept') >= 0) {
        //         this.setState({
        //             isDragging: true
        //         });
        //     }
        // }
    }

    onMouseMoveHandler(e) {
        // const { isDragging } = this.state;
        // if (isDragging) {
        //     console.log(e.clientX + ' ' + e.clientY);
        // }
    }

    onMouseUpHandler() {
        // const { isDragging } = this.state;
        // if (isDragging) {
        //     this.setState({
        //         isDragging: false
        //     });
        // }
    }
    //#endregion

    render() {
        const { isLoaded } = this.state;
        return (
                !isLoaded
                ? <img src="/assets/images/load_indicator.gif" />
                : this.content
        )
    }
}