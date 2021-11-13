import {Component} from "react";

class ListElement extends Component {
    render() {
        return (

            <div>
                {/*<p>{this.props.fetch_url + "/" + this.props.value}</p>*/}
                <div
                    onClick={() => this.props.handler(this.props.fetch_url + "/" + this.props.value)}>{this.props.value}</div>
            </div>
        );
    }
}

export default ListElement;
