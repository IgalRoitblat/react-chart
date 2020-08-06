import React, { Component } from "react";
import "./Dropdown.scss";

class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listOpen: false,
            headerTitle: this.props.title,
        };
    }
    toggleList() {
        this.setState((prevState) => ({
            listOpen: !prevState.listOpen,
        }));
    }
    onDropDownItemClick(e) {
        this.props.dropDownItemClicked();
    }
    render() {
        const { list } = this.props;
        const { listOpen, headerTitle } = this.state;
        return (
            <div className="Dropdown">
                <div className="dd-header" onClick={() => this.toggleList()}>
                    <div className="dd-header-title">{headerTitle}</div>
                </div>
                {listOpen && (
                    <ul className="dd-list">
                        {list.map((item) => (
                            <li
                                className="dd-list-item"
                                id={item.title}
                                key={item.id}
                                onClick={this.props.dropDownItemClicked}
                            >
                                {item.title}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}
export default Dropdown;
