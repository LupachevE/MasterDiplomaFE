import React, { Component } from 'react'
import ModelNavigation from './ModelNavigation/ModelNavigation.jsx'
import TableView from './TableView/TableView.jsx'
import GraphView from './GraphView/GraphView.jsx'

export default class ModelView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navIndex: 0
        }
    }

    navClickHandler(index) {
        this.setState({
            navIndex: index
        });
    }

    render () {
        const { navIndex } = this.state;
        const { cardData, onAddClick, addNewConcept, addNewLink, deleteConcept, deleteLink, editConcept } = this.props;
        return (
            <div style={{ height: '100%' }}>
                <h1>Модель</h1>
                <div className="viewNavigation">
                    <button onClick={this.navClickHandler.bind(this, 0)} className={`navButton ${navIndex === 0 ? 'active' : ''}`}>Табличное</button>
                    <button onClick={this.navClickHandler.bind(this, 1)} className={`navButton ${navIndex === 1 ? 'active' : ''}`}>Графическое</button>
                </div>
                {
                    navIndex === 0
                        ? <TableView
                            addNewLink={addNewLink}
                            addNewConcept={addNewConcept}
                            editConcept={editConcept}
                            cardData={cardData}
                            deleteConcept={deleteConcept}
                            deleteLink={deleteLink}
                        />
                        : <GraphView cardData={cardData} />
                }
                <ModelNavigation index={navIndex} onAddClick={onAddClick} />
            </div>
        )
    }
}