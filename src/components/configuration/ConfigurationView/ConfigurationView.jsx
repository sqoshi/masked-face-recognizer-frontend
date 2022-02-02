import {Component} from "react";
import Collapsible from "react-collapsible";


class ConfigurationView extends Component {
    state = {configurationList: []}

    addCollapsibleOnBtnClick = () => {
        this.setState({
            configurationList: this.state.configurationList.concat(this.createCollapsible())
        })
    };

    createCollapsible() {
        return <Collapsible
            key={this.state.configurationList.length}
            trigger={`Configuration ` + this.state.configurationList.length}
        >
            <p>Configure SVM</p>
            <p>Train Set Modification</p>
            <p>Test Set Modification</p>
        </Collapsible>
    }


    render() {
        return (
            <div style={{top: "10px"}}>
                <button onClick={this.addCollapsibleOnBtnClick}>Add input</button>
                {/*{createCollapsible("Configure Learning Procedure")}*/}
                {/*{createCollapsible("Configure Learning Procedure")}*/}
                {console.log(this.state.configurationList)}
                {this.state.configurationList}
            </div>
        )
    }
}

export default ConfigurationView;
