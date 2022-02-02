import {Component} from "react";

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

/***
 * Computes accuracy depnding on data.
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
 * Shows grouped statistics for an experiments, multiple analysis handling.
 */
class ExperimentSummary extends Component {
    state = {
        data: {},
        experiment_url: this.props.experiment_url,
        availableAnalysis: []
    }

    componentDidMount() {
        this.getData();
    }


    fetchAnalysisList() {
        fetch(this.state.experiment_url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    availableAnalysis: data.directories
                });

                for (let analysisId of this.state.availableAnalysis) {
                    this.fetchAnalysisResult(analysisId)
                }

            });
    }

    fetchAnalysisResult(analysisId) {
        fetch(this.state.experiment_url + "/" + analysisId + "/results")
            .then(response => response.json())
            .then(data => {
                let data_copy = this.state.data
                data_copy[analysisId] = computeAccuracy(data) //.content.data
                this.setState({
                    data: data_copy
                });

                console.log(data_copy)
            });
    }

    getData = () => {
        this.fetchAnalysisList()
        // for (let analysisId of this.state.availableAnalysis) {
        //     this.fetchAnalysisResult(analysisId)
        // }


    }

    render() {
        return (
            <div>
                {this.props.experiment_url}
                {console.log(this.state)}
            </div>
        );
    }
}

export default ExperimentSummary;
