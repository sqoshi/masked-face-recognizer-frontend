import {Component, useEffect, useState} from "react";
import ListElement from "./ListElement";

class EntitiesList extends Component {
    intervalID;
    state = {
        data: {},
        fetch_url: this.props.fetch_url,
    }

    constructor(props) {
        super(props)
        this.handler = this.handler.bind(this)
    }

    handler(new_url) {
        console.log(new_url)
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
        let handler = this.handler
        return (
            <div>
                {this.state.data.directories ?
                    this.state.data.directories.map(
                        function (value, index) {
                            return <ListElement key={index} value={value} fetch_url={url}
                                                handler={handler}/>;
                        }) : "Loading..."
                }
            </div>
        );
    }
}

export default EntitiesList;
