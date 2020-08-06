import React, { Component } from "react";
import "./LoadTimeContainer.scss";

class LoadTimeContainer extends Component {
    render() {
        const { clickedItem } = this.props;
        return (
            <div className="LoadTimeContainer">
                <div>Initial Load time(MS): {clickedItem.initialLoadTime}</div>
                <div>Current Load time(MS):{clickedItem.lastLoadTime}</div>
            </div>
        );
    }
}
export default LoadTimeContainer;
