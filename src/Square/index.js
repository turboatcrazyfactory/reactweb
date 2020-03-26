import React from "react";
import "./Square.css";

export class Square extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cssClass: ''
        };
    }

    render() {
        if (this.props.lastClickLocation === this.props.id) {
            this.state.cssClass = 'flash-in';
            setTimeout(() => {
                this.setState({cssClass: ''});
            }, 2000);
        }

        return (
            <button className={"square " + this.state.cssClass}
                    onClick={this.props.onClick}
            >
                {this.props.value}
            </button>
        );
    }
}
