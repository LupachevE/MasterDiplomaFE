import React, { Component } from 'react'

export default class ModelNavigation extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const { onAddClick, index } = this.props;

        return (
            <div className="modelNavigation">
                {
                    (index != 0) && <button className="link" />
                }
                <button className="add" onClick={onAddClick}/>
                {
                    (index != 0) && <button className="refresh" />
                }
            </div>
        )
    }
}