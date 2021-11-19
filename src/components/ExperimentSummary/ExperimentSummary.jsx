import {Component} from "react";

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
                data_copy[analysisId] = data.content.data
                this.setState({
                    data: data_copy
                });


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
