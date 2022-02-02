import {Component} from "react";
import "./list_styles.css"

/**
 * List element representation maybe an analysis or experiment or dataset name.
 */
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
