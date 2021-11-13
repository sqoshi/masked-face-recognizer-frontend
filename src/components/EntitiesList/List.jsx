import {Component} from "react";
import ListElement from "./ListElement";
import AnalysisView from "../AnalysisView/AnalysisView";

const listStyles = {
    width: "60%",
    backgroundColor: "grey",
    padding: "10px",
    borderRadius: "10px",
    borderColor: "#00f"
};

function removeLastChild(link) {
    if (link.endsWith("/")) {
        link = link.slice(0, -1);
    }
    let parts = link.split("/");
    parts.pop();
    return parts.join("/")
}

class EntitiesList extends Component {
    intervalID;
    state = {
        data: {},
        fetch_url: this.props.fetch_url,
    }

    constructor(props) {
        super(props)
        this.handler = this.handler.bind(this)
        this.back = this.back.bind(this)
    }

    handler(new_url) {
        this.setState(
            {
                data: this.state.data,
                fetch_url: new_url,
            })

        fetch(this.state.fetch_url)
            .then(response => response.json())
            .then(data => {
                this.setState({data: data})
            });
    }

    back() {
        let previous_link = removeLastChild(this.state.fetch_url)
        if (previous_link.split("/").length > 3) {
            this.setState(
                {
                    data: this.state.data,
                    fetch_url: previous_link,
                })
        }
    }

    componentDidMount() {
        this.getData();
    }

    componentWillUnmount() {
        clearTimeout(this.intervalID);
    }

    getData = () => {
        fetch(this.state.fetch_url)
            .then(response => response.json())
            .then(data => {
                this.setState({data: data});
                this.intervalID = setTimeout(this.getData.bind(this), 500);
            });
    }

    render() {
        const url = this.state.fetch_url
        let data = this.state.data
        let handler = this.handler
        let back = this.back
        return (
            <div style={listStyles}>
                <button onClick={back}>BACK</button>
                {this.state.data.directories ?
                    this.state.data.directories.map(
                        function (value, index) {
                            return <ListElement key={index} value={value} fetch_url={url}
                                                data={data}
                                                handler={handler}/>;
                        }) : "No directories ..."
                }
                {this.state.data.content_type === "analysis" ?
                    <AnalysisView fetch_url={url}/> : ""
                }
            </div>
        );
    }
}

export default EntitiesList;
