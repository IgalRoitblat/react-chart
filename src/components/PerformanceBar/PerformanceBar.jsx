import React, { Component } from "react";
import "./PerformanceBar.scss";

class PerformanceBar extends Component {
    calcBarInnerWidth() {
        const innerWidth =
            (this.props.clickedItem.lastLoadTime /
                this.props.clickedItem.initialLoadTime) *
            100;
        if (innerWidth > 100) {
            return { width: "100%" };
        } else {
            return { width: `${innerWidth}%` };
        }
    }
    render() {
        const { clickedItem } = this.props;
        return (
            <div className="PerformanceBar">
                <div className="bar-outer">
                    <div className="bar-inner" style={this.calcBarInnerWidth()}>
                        {!isNaN(clickedItem.initialLoadTime)
                            ? `${(
                                  (clickedItem.lastLoadTime /
                                      clickedItem.initialLoadTime) *
                                  100
                              ).toFixed(2)}%`
                            : "0%"}
                    </div>
                </div>
            </div>
        );
    }
}
export default PerformanceBar;
