import React, { Component } from 'react'

export default class ResultTable extends Component {
    constructor(props) {
    super(props);

        this.state = {

        }
    }

    render() {
        const { concepts, result } = this.props;
        return (
        <div className="structView">
            <table>
                <thead>
                    <tr>
                        <td>
                        </td>
                        <th>
                            Консонанс влияния концепта на систему
                        </th>
                        <th>
                            Консонанс влияния системы на концепт
                        </th>
                        <th>
                            Диссонанс влияния концепта на систему
                        </th>
                        <th>
                            Диссонанс влияния системы на концепт
                        </th>
                        <th>
                            Воздействие концепта на систему
                        </th>
                        <th>
                            Воздействие системы на концепт
                        </th>
                        <th>
                            Показатель централизации консонанса
                        </th>
                        <th>
                            Показатель централизации воздействия
                        </th>
                        <th>
                            Совместный показатель взаимного консонанса концепта и системы
                        </th>
                        <th>
                            Совместный показатель взаимного диссонанса концепта и системы
                        </th>
                    </tr>
                </thead>
                <tbody>
                        {
                            result.map((el, index) =>
                                <tr>
                                    <th>{concepts[index].name}</th>
                                    {
                                        el.map((value, col) =>
                                            <td>{value.StringValue}</td>
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