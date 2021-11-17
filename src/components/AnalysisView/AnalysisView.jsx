import EnhancedTable from "../ResultsTable/ResultsTable";
import Collapsible from "react-collapsible";
import ReactJson from "react-json-view";

const {Component} = require("react");

const collapsibleStyle = {
    padding: "10px",
    margin: "10px",
    borderRadius: "10px",
    // backgroundColor: "black",
    cursor: "pointer",
};

function createCollapsible(name, content) {
    return <div style={collapsibleStyle}>
        <Collapsible trigger={name}>
            <p style={{
                fontSize: "15px"
            }}>{content}</p>
        </Collapsible>
    </div>
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function computeAccuracy(data) {
    let result = {
        "perfect": "No data.",
        "top5": "No data."
    }
    if (!isEmpty(data)) {
        let top5_number = 0.0
        let perfect_number = 0.0
        let all_tests_number = 0.0
        for (let x of data.content.data) {
            all_tests_number += x.perfect + x.top5 + x.fail
            perfect_number += x.perfect
            top5_number += x.top5
        }
        console.log("Perfect matches " + perfect_number + " of " + all_tests_number)
        console.log("top5 matches " + top5_number + " of " + all_tests_number)
        result.perfect = (perfect_number / all_tests_number * 100).toFixed(3)
        result.top5 = ((top5_number + perfect_number) / all_tests_number * 100).toFixed(3)
    }
    return result
}

class AnalysisView extends Component {
    state = {
        tableData: {},
        modelDetails: {},
        analysisDetails: {},
        perfectAcc: "No data",
        top5Acc: "No data",
        fetch_url: this.props.fetch_url,
    }

    componentDidMount() {
        this.getData();
    }

    fetchTableData() {
        fetch(this.state.fetch_url + "/results")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    tableData: data,
                });
            });
    }

    fetchModelDetails() {
        fetch(this.state.fetch_url + "/model")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    modelDetails: data.content,
                });
            });
    }

    fetchAnalysisDetails() {
        fetch(this.state.fetch_url + "/analysis_config")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    analysisDetails: data.content
                });
            });
    }

    getData = () => {
        this.fetchTableData()
        this.fetchModelDetails()
        this.fetchAnalysisDetails()
    }


    render() {
        let acc = computeAccuracy(this.state.tableData)
        return (
            <div style={{top: "10px"}}>
                <h1>Analysis Dashboard</h1>
                <div>
                    <p>Perfect accuracy: {acc.perfect}</p>
                    <p>Top5 accuracy: {acc.top5}</p>
                </div>
                {createCollapsible("Analysis Details", <ReactJson src={this.state.analysisDetails}/>)}
                {createCollapsible("Model Details", <ReactJson src={this.state.modelDetails}/>)}
                {createCollapsible("Results", <EnhancedTable tableData={this.state.tableData}/>)}
            </div>
        )
    }
}

export default AnalysisView;
