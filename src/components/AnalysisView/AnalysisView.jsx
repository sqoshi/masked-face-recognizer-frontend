import EnhancedTable from "../ResultsTable/ResultsTable";
import Collapsible from "react-collapsible";
import ReactJson from "react-json-view";

const {Component} = require("react");

function createCollapsible(name, content) {
    return <Collapsible trigger={name}>
        <p>{content}</p>
    </Collapsible>
}

class AnalysisView extends Component {
    state = {
        tableData: {},
        modelDetails: {},
        analysisDetails: {},
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
                    modelDetails: data,
                });
            });
    }

    fetchAnalysisDetails() {
        fetch(this.state.fetch_url + "/analysis_config")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    analysisDetails: data
                });
            });
    }

    getData = () => {
        this.fetchTableData()
        this.fetchModelDetails()
        this.fetchAnalysisDetails()
    }


    render() {
        let tableData = this.state.tableData;
        return (
            <div>
                <h1>Analysis Dashboard</h1>
                {createCollapsible("Analysis Details", <ReactJson src={this.state.analysisDetails} />)}
                {createCollapsible("Model Details", <ReactJson src={this.state.modelDetails} />)}
                {createCollapsible("Results", <EnhancedTable tableData={tableData}/>)}
            </div>
        )
    }
}

export default AnalysisView;
