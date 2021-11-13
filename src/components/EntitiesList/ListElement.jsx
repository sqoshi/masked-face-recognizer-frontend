import {Component} from "react";

const elementStyle = {
    padding: "10px",
    margin: "10px",
    backgroundColor: "#282c34",
    cursor: "pointer"
};

class ListElement extends Component {
    render() {
        return (
            <div style={elementStyle}>
                {/*<p>{this.props.fetch_url + "/" + this.props.value}</p>*/}
                {/*{console.log(this.props.fetch_url)}*/}
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
