import {Component} from "react";
import Collapsible from "react-collapsible";


function createCollapsibleHeader(text) {
    return <p style={{cursor: "pointer", backgroundColor: "green", borderRadius: "10px"}}>
        {text}
    </p>
}

function generateInputs(dictionary, header) {
    return <div>
        <p>{header}</p>
        <ul>
            {Object.keys(dictionary).map((item) => {
                if (typeof dictionary[item] != "object")
                    return <li>
                        <label>{item}:
                            <input value={dictionary[item]}/>
                        </label>
                    </li>
                else {
                    return generateInputs(dictionary[item], item)
                }
            })}
        </ul>
    </div>
}

class ConfigurationView extends Component {
    state = {configurationList: []}

    addCollapsibleOnBtnClick = () => {
        this.setState({
            configurationList: this.state.configurationList.concat(this.createEmptyConfiguration())
        })
    };

    createEmptyConfiguration = () => {
        return {
            "dataset": "celeba",
            "name": "",
            "split_ratio": 0.6,
            "piq": 1,
            "equal_piqs": true,
            "identities_limit": 40,
            "landmarks_detection": false,
            "train_set_mods": {
                "mask_ratio": 0.6,
                "inplace": false,
                "mask": 0
            },
            "test_set_mods": {
                "mask_ratio": 0.6,
                "inplace": false,
                "mask": 0
            },
            "svm_config": {
                "C": 1.0,
                "kernel": "linear",
                "degree": 5,
                "probability": true,
                "random_state": true,
            }

        }
    }


    createCollapsible(configuration) {
        return <Collapsible
            key={this.state.configurationList.length}
            trigger={createCollapsibleHeader(`Configuration #` + this.state.configurationList.length)}
        >
            {generateInputs(configuration, "Default config")}
        </Collapsible>
    }


    render() {
        return (
            <div style={{top: "10px"}}>
                <button onClick={this.addCollapsibleOnBtnClick} style={{padding: "30px"}}>Add input</button>
                {this.state.configurationList.map((item) => {
                    return this.createCollapsible(item)
                })}
            </div>
        )
    }
}

export default ConfigurationView;
