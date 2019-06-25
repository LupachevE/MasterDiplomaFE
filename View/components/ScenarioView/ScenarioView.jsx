import React, { Component } from 'react'

export default class ScenarioView extends Component {
    render () {
        return (
            <div>
                <h1>Сценарный анализ</h1>
                <div className="viewNavigation">
                    <button className="navButton">Настройки</button>
                    <button className="navButton">Внешние воздействия</button>
                    <button className="navButton">Рассчитать альтернативы</button>
                </div>
                <div className="viewNavigation">
                    <button className="navButton active">Сравнение альтернатив</button>
                    <button className="navButton">Альтернативы</button>
                </div>
            </div>
        )
    }
}