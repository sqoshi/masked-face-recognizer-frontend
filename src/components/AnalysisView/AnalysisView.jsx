import EnhancedTable from "../ResultsTable/ResultsTable";
import Collapsible from "react-collapsible";
import ReactJson from "react-json-view";
import {BsChevronDown} from "react-icons/bs";
import "./analysisview_styles.css"

const {Component} = require("react");

/**
 * Name beautifier.
 * @param name
 * @returns {JSX.Element}
 */
function upgradeName(name) {
    return <div style={{display: "flex", flexDirection: "row"}}>
        <div style={{flex: 1}}>{name}</div>
        <div style={{right: 0}}><BsChevronDown/></div>
    </div>
}

/**
 * Creates collapside element
 * @param name
 * @param content
 * @returns {JSX.Element}
 */
function createCollapsible(name, content) {
    return <div className={"collapsible-element"}>

        <Collapsible trigger={upgradeName(name)}>
            <p style={{fontSize: "15px"}}>{content}</p>
        </Collapsible>

    </div>
}

/**
 * Checks if obj is an empty instance
 * @param obj
 * @returns {boolean}
 */
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

/***
 * Choosing numerical value according to given percentage from red to green.
 * @param percent
 * @returns {string}
 */
function getColor(percent) {
    let r = percent < 50 ? 255 : Math.floor(255 - (percent * 2 - 100) * 255 / 100),
        g = percent > 50 ? 255 : Math.floor((percent * 2) * 255 / 100);
    return 'rgb(' + r + ',' + g + ',0)';
}

/**
 * Counts classifications and computes accuracies of model.
 * @param data
 * @returns {{perfect: string, top5: string}}
 */
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
        result.perfect = (perfect_number / all_tests_number * 100).toFixed(3)
        result.top5 = ((top5_number + perfect_number) / all_tests_number * 100).toFixed(3)
    }
    return result
}

/**
 * Shows model configuration, dataset reading limitation and modifications,
 * masking strategy and statistics achieved in evaluation stage.
 */
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
                    <p style={{color: getColor(acc.perfect)}}>Perfect accuracy: {acc.perfect}</p>
                    <p style={{color: getColor(acc.top5)}}>Top5 accuracy: {acc.top5}</p>
                </div>
                {createCollapsible("Analysis Details", <ReactJson src={this.state.analysisDetails}/>)}
                {createCollapsible("Model Details", <ReactJson src={this.state.modelDetails}/>)}
                {createCollapsible("Results", <EnhancedTable tableData={this.state.tableData}/>)}
            </div>
        )
    }
}

export default AnalysisView;
