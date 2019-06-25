import React, { Component } from 'react'
import ResultTable from './ResultTable/ResultTable.jsx';

export default class StructView extends Component {
    render () {
        const { calcStructClickHandler, result, concepts } = this.props;
        return (
            <div>
                <h1>Структурно-целевой анализ</h1>
                <div className="viewNavigation">
                    <button onClick={calcStructClickHandler} className={`navButton`}>Рассчитать</button>
                </div>
                {
                    result && <ResultTable concepts={concepts} result={result} />
                }
            </div>
        )
    }
}