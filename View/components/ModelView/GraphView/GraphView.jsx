import React, { Component } from 'react'

export default class GraphView extends Component {

    constructor(props) {
        super(props);

        this.nodeHeight = 20;
        this.nodeWidth = 80;
        this.textHeight = 5;
        this.textWidth = 60;
        this.minShift = 20;
        this.arrowShift = 11;

        this.svgRef = React.createRef();

        this.state = {

        };
    }

    componentDidMount() {
        this.forceUpdate();
    }

    drawNodes() {
        const { cardData } = this.props;

        const svgRect = this.svgRef.current.getBoundingClientRect();
        const circleR = Math.floor((svgRect.height - 50) / 2);

        const circleCenter = {
            x: Math.floor(svgRect.width / 2),
            y: Math.floor(svgRect.height / 2)
        }

        const angleIndent = 360 / cardData.concepts.length;
        return cardData.concepts.map((el, index) => {
            const angle = angleIndent * index * Math.PI / 180;
            const x = Math.floor(circleCenter.x + Math.sin(angle) * circleR);
            const y = Math.floor(circleCenter.y + Math.cos(angle) * circleR)
            
            return {
                id: el.id,
                name: el.name,
                angle,
                x,
                y
            }
        });
    }

    drawLinks(nodes) {
        const self = this;
        const { cardData } = this.props;

        return cardData.cognitiveCardLinks.map((el, index) => {
            const sourceNode = nodes.find(node => node.id === el.sourceConcept);
            const destNode = nodes.find(node => node.id === el.destinationConcept);
            const soursePoint = {
                x: sourceNode.x - 20,
                y: sourceNode.y
            };

            let destPoint = {
                x: destNode.x + ((sourceNode.x - destNode.x < -self.minShift)
                    ? -(self.nodeWidth)
                    : ((sourceNode.x - destNode.x > self.minShift) ? self.nodeWidth : 0)),
                y: destNode.y + ((sourceNode.y - destNode.y < -self.minShift)
                    ? -(self.nodeHeight)
                    : ((sourceNode.y - destNode.y > self.minShift) ? self.nodeHeight : 0))
            }

            const angleToRotate = (sourceNode.angle - destNode.angle) * 180 / Math.PI;
            const arrowShiftX = self.arrowShift * Math.abs(Math.sin(angleToRotate));
            const arrowShiftY = self.arrowShift * Math.abs(Math.cos(angleToRotate));
            
            if (sourceNode.x > destNode.x) {
                destPoint.x += arrowShiftX;
            }
            else {
                destPoint.x -= arrowShiftX;
            }

            if (sourceNode.y > destNode.y) {
                destPoint.y += arrowShiftY;
            }
            else {
                destPoint.y -= arrowShiftY;
            }

            return  (
                <g>
                    <line
                        strokeWidth={Math.abs(el.connectionWeight) * 10}
                        stroke={el.connectionWeight > 0 ? 'red' : 'blue'}
                        x1={soursePoint.x}
                        y1={soursePoint.y}
                        x2={destPoint.x}
                        y2={destPoint.y}
                    />
                    <polygon
                        style={{
                            transformOrigin: `${destPoint.x}px ${destPoint.y}px`,
                            transform: `rotate(${180 - (sourceNode.angle * 180 / Math.PI)}deg)`
                        }}
                        fill={el.connectionWeight > 0 ? 'red' : 'blue'}
                        points={
                            `${destPoint.x - 10},${destPoint.y + 9}
                            ${destPoint.x},${destPoint.y - 9}
                            ${destPoint.x},${destPoint.y - 9}
                            ${destPoint.x + 10},${destPoint.y + 9}`}
                    />
                </g>
            );
        });
    }

    get card() {
        const self = this;

        let nodes = [];
        let links = [];
        if (this.svgRef.current) {
            nodes = this.drawNodes();

            links = this.drawLinks(nodes);
        }

        return (
            <g>
            {
                links
            }
            {
                nodes.map(el => 
                    <g>
                        <polygon
                            points={
                                `${el.x - self.nodeWidth},${el.y - self.nodeHeight}
                                 ${el.x + self.nodeWidth},${el.y - self.nodeHeight}
                                 ${el.x + self.nodeWidth},${el.y + self.nodeHeight}
                                 ${el.x - self.nodeWidth},${el.y + self.nodeHeight}`}
                            fill="white"
                            stroke="cornflowerblue"
                            strokeWidth="2"/>
                        <text
                            x={el.x - self.nodeWidth + 5}
                            y={el.y + self.textHeight}>
                                {el.name}
                        </text>
                    </g>
                )
            }
            </g>
        );
    }

    render() {
        return (
            <div ref={this.svgRef} className='graghView'>
                <svg>
                    {this.card}
                </svg>
            </div>
        )
    }
}