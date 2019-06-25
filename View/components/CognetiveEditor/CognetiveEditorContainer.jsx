import React, { Component } from 'react';
import CognitiveCardClass from '../../../Model/CognitiveCardClass';
import CognitiveConcept from './CognitiveConcept/CognitiveConcept.jsx'
import CognitiveLink from './CognitiveLink/CognitiveLink.jsx'
import ModelView from '../ModelView/ModelView.jsx'
import ScenarioView from '../ScenarioView/ScenarioView.jsx'
import StructView from '../StructView/StructView.jsx'
import Loader from '../Loader/Loader.jsx';

export default class CognetiveEditorContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            card: null,
            isError: false,
            error: null,
            isDragging: false,
            navIndex: 0,
            struct: null
        }
    }

    componentDidMount() {
        const Card = new CognitiveCardClass();
        Card.getCardData(1).then(res => {
            Card.data = res;
            console.log(res);
            const self = this;
            setTimeout(function () {
                self.setState({
                    isLoaded: true,
                    cardData: res
                });
            }, 500);
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

    onAddClick() {
        const { cardData } = this.state;

        const newConceptsArr = cardData.concepts;

        newConceptsArr.push({
            name: '',
            id: cardData.concepts.length + 1
        });

        this.setState({
            cardData: {
                ...cardData,
                concepts: newConceptsArr
            }
        });
    }

    addNewConcept(newConcept) {
        const { cardData } = this.state;

        const newConceptsArr = cardData.concepts;
        const emptyConcept = newConceptsArr.find(el => el.name === '');
        newConceptsArr[newConceptsArr.indexOf(emptyConcept)] = {
            id: emptyConcept.id,
            name: newConcept
        };

        this.setState({
            cardData: {
                ...cardData,
                concepts: newConceptsArr
            }
        });
    }

    editConcept(index, newConceptName) {
        const { cardData } = this.state;

        const newConceptsArr = cardData.concepts;
        const currConcept = newConceptsArr[index];
        newConceptsArr[index] = {
            id: currConcept.id,
            name: newConceptName
        };

        this.setState({
            cardData: {
                ...cardData,
                concepts: newConceptsArr
            }
        });
    }

    addNewLink(destIndex, sourceIndex, newValue) {
        const { cardData } = this.state;

        const newLinksArray = cardData.cognitiveCardLinks,
            sourceConcept = cardData.concepts[destIndex],
            destConcept = cardData.concepts[sourceIndex],
            currLink = cardData.cognitiveCardLinks
                .find(el => el.destinationConcept === destConcept.id && el.sourceConcept === sourceConcept.id);
        
        if (currLink) {
            newLinksArray[newLinksArray.indexOf(currLink)] = {
                ...currLink,
                connectionWeight: newValue
            }
        }
        else {
            newLinksArray.push({
                connectionWeight: newValue,
                destinationConcept: destConcept.id,
                diagramid: 0,
                sourceConcept: sourceConcept.id,
                uniqID: cardData.cognitiveCardLinks.length
            });
        }
        
        this.setState({
            cardData: {
                ...cardData,
                cognitiveCardLinks: newLinksArray
            }
        })
    }

    deleteConcept() {

    }

    deleteLink() {

    }

    calcStructClickHandler() {
        const { cardData } = this.state;

        $.ajax({
            url: '/api/struct/',  
            type: 'GET',  
            dataType: 'json',
            data: {
                'id': JSON.stringify(cardData)
            },
            success: data => {
                const self = this;
                setTimeout(function () {
                    self.setState({
                        isLoaded: true,
                        struct: data
                    });
                }, 500);
            },
            error: error => {
                console.log(error);
            }
        });
        this.setState({
            isLoaded: false
        });
    }

    get content() {
        const { isLoaded, navIndex, cardData, struct } = this.state;

        let currTab = null;
        switch(navIndex) {
            case 0:
                currTab = <ModelView
                            addNewLink={(destIndex, sourceIndex, newValue) => this.addNewLink.call(this, destIndex, sourceIndex, newValue)}
                            addNewConcept={(newConceptName) => this.addNewConcept.call(this, newConceptName)}
                            editConcept={(index, newConceptName) => this.editConcept.call(this, index, newConceptName)}
                            onAddClick={this.onAddClick.bind(this)}
                            cardData={cardData}
                            deleteConcept={this.deleteConcept.bind(this)}
                            deleteLink={this.deleteLink.bind(this)}
                            />;
                break;
            case 1:
                currTab = <StructView result={struct} concepts={cardData.concepts} calcStructClickHandler={this.calcStructClickHandler.bind(this)} />;
                break;
            case 2:
                currTab = <ScenarioView />;
                break;
        }

        return (
            isLoaded ? <div className="tab">
            {
                currTab
            }
            </div>
            : <Loader />
        )
    }

    handleNavClick(index) {
        this.setState({
            navIndex: index
        });
    }

    get navigation() {
        const { navIndex } = this.state;

        return (
            <div className="mainNavigation">
                <button onClick={this.handleNavClick.bind(this, 0)} className={`navButton ${navIndex === 0 ? 'active' : ''}`}>Модель</button>
                <button onClick={this.handleNavClick.bind(this, 1)} className={`navButton ${navIndex === 1 ? 'active' : ''}`}>Структурно-целевой анализ</button>
                <button onClick={this.handleNavClick.bind(this, 2)} className={`navButton ${navIndex === 2 ? 'active' : ''}`}>Сценарный анализ</button>
            </div>
        )
    }

    render() {
        return (
            <div className="main">
                {this.navigation}
                {this.content}
            </div>
        )
    }
}