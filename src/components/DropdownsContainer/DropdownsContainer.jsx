import React, { Component } from "react";
import "./DropdownsContainer.scss";
import Dropdown from "../Dropdown/Dropdown";

class DropdownsContainer extends Component {
    render() {
        const { dropdowns } = this.props;
        return (
            <div className="DropdownsContainer">
                {dropdowns.map((dropdown, index) => (
                    <Dropdown
                        title={dropdown.title}
                        list={dropdown.list}
                        toggleItem={dropdown.toggleItem}
                        dropDownItemClicked={dropdown.dropDownItemClicked}
                        key={index}
                    />
                ))}
            </div>
        );
    }
}
export default DropdownsContainer;
