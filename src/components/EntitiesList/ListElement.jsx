import {Component} from "react";
import "./list_styles.css"

class ListElement extends Component {
    render() {
        return (
            <div className={"list-element"}>
                <div
                    onClick={
                        () => this.props.handler(this.props.fetch_url + "/" + this.props.value)
                    }>
                    {this.props.value}</div>
            </div>
        );
    }
}

export default ListElement;
