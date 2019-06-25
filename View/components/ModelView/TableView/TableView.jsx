import React, { Component } from 'react'

export default class TableView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newConceptName: '',
            editConceptIndex: -1,
            editConnectionRow: -1,
            editConnectionCol: -1,
            editConnectionValue: '',
            selectedCol: -1,
            selectedRow: -1

        };
    }

    newConceptInputPressHandler(e, index) {
        const { addNewConcept, editConcept } = this.props;
        if (e.which === 13) {
            if (index >= 0) {
                editConcept(index, this.refs.newConceptInput.value);
            }
            else {
                addNewConcept(this.refs.newConceptInput.value);
            }

            this.setState({
                newConceptName: '',
                editConceptIndex: -1
            });
        }
    }

    newLinkInputPressHandler(e, row, col) {
        const { addNewLink } = this.props;
        const { editConnectionValue } = this.state;
        if (e.which === 13) {
            addNewLink(row, col, editConnectionValue);
            this.setState({
                editConnectionRow: -1,
                editConnectionCol: -1,
                editConnectionValue: ''
            });
        }
    }

    newConceptInputChangeHandler() {
        this.setState({
            newConceptName: this.refs.newConceptInput.value
        });
    }

    handleChangeLink(row, col) {
        this.setState({
            editConnectionRow: row,
            editConnectionCol: col
        });
    }

    connectionChangeHandler(e) {
        this.setState({
            editConnectionValue: e.target.value
        });
    }

    selectRow(row) {
        this.setState({
            selectedRow: row,
            selectedCol: -1
        });
    }

    selectCol(col) {
        this.setState({
            selectedRow: -1,
            selectedCol: col
        });
    }

    handleHeaderDblClick(index) {
        const { cardData } = this.props;

        this.setState({
            editConceptIndex: index,
            newConceptName: cardData.concepts[index].name
        });
    }

    render() {
        const { cardData } = this.props;
        const { newConceptName, editConnectionCol, editConnectionRow, editConnectionValue, selectedRow, selectedCol, editConceptIndex } = this.state;
        const header = cardData.concepts.map(el => el);
        return (
            <div className="tableView">
                <table>
                    <thead>
                        <tr>
                            <td />
                            {
                                header.map((el, index) =>
                                    <th onDoubleClick={() => this.handleHeaderDblClick.call(this, index)} className={selectedCol === index ? 'active' : ''} onClick={() => this.selectCol.call(this, index)} key={'header' + index}>
                                    {
                                        el.name ? (editConceptIndex === index ?
                                                <input
                                                    ref="newConceptInput"
                                                    value={newConceptName}
                                                    autoFocus
                                                    onChange={this.newConceptInputChangeHandler.bind(this)}
                                                    onKeyPress={(e) => this.newConceptInputPressHandler.call(this, e, index)}
                                                /> : el.name)
                                        : <input
                                            ref="newConceptInput"
                                            value={newConceptName}
                                            autoFocus
                                            onChange={this.newConceptInputChangeHandler.bind(this)}
                                            onKeyPress={(e) => this.newConceptInputPressHandler.call(this, e)}
                                        />
                                    }
                                    </th>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            header.map((el, row) => 
                                <tr key={'row' + row}>
                                    <th onDoubleClick={() => this.handleHeaderDblClick.call(this, row)} className={selectedRow === row ? 'active' : ''} onClick={() => this.selectRow.call(this, row)} key={'headerrow' + row}>{el.name}</th>
                                    {
                                        header.map((e, col) =>
                                            cardData.cognitiveCardLinks.find(elem => elem.sourceConcept === el.id && elem.destinationConcept === e.id)
                                            ? <td onDoubleClick={() => this.handleChangeLink.call(this, row, col)} key={'cell' + row + col}>{
                                                 (editConnectionCol === col && editConnectionRow === row
                                                    ? <input min="-1" max="1" step="0.1" type="number" autoFocus
                                                        onChange={this.connectionChangeHandler.bind(this)}
                                                        onKeyPress={(e) => this.newLinkInputPressHandler.call(this, e, row, col)}
                                                        value={editConnectionValue}
                                                    /> 
                                                    : cardData.cognitiveCardLinks
                                                        .find(elem => elem.sourceConcept === el.id && elem.destinationConcept === e.id).connectionWeight)
                                            }</td>
                                            : <td onDoubleClick={() => this.handleChangeLink.call(this, row, col)} key={'cell' + row + col}>
                                                {
                                                    (editConnectionCol === col && editConnectionRow === row
                                                        ? <input min="-1" max="1" step="0.1" type="number" type="number" autoFocus
                                                            onChange={this.connectionChangeHandler.bind(this)}
                                                            onKeyPress={(e) => this.newLinkInputPressHandler.call(this, e, row, col)}
                                                            value={editConnectionValue} /> 
                                                        : 0)
                                                }
                                            </td>
                                        )
                                    }
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}