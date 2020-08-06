import React, { Component } from "react";
import "./ChartContainer.scss";
import CanvasJSReact from "../../canvasjs.react";
const Chart = CanvasJSReact.CanvasJSChart;

class ChartContainer extends Component {
    render() {
        const { chartOptions } = this.props;
        return (
            <div className="ChartContainer">
                <Chart options={chartOptions} />
            </div>
        );
    }
}
export default ChartContainer;
