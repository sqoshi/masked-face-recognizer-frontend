import {Component} from "react";
import Collapsible from "react-collapsible";
import ConfigurationInput from "../ConfigurationInput/ConfigurationInput";
import {Card, CardActionArea, CardContent} from "@mui/material";


function createCollapsibleHeader(text) {
    return <CardActionArea style={{cursor: "pointer", backgroundColor: "red", borderRadius: "10px", padding: "10px"}}>
        {text}
    </CardActionArea>
}

function dictKeyToText(text) {
    return (text.charAt(0).toUpperCase() + text.slice(1)).replaceAll("_", " ")
}

function textToDictKey(text) {
    return (text.charAt(0).toLowerCase() + text.slice(1)).replaceAll(" ", "_")
}

function generateInputs(dictionary, header) {
    return <Card variant="elevation" style={{padding: "10px", margin: "10px"}}>
        <p style={{display: "flex", justifyContent: "center"}}>{dictKeyToText(header)}</p>
        <CardContent>
            {Object.keys(dictionary).map((item) => {
                if (typeof dictionary[item] != "object")
                    return <ConfigurationInput label={dictKeyToText(item)} defaultValue={dictionary[item]}/>
                else {
                    return generateInputs(dictionary[item], item)
                }
            })}
        </CardContent>
    </Card>

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
            "svm_config": {
                "C": 1.0,
                "kernel": "linear",
                "degree": 5,
                "probability": true,
                "random_state": true,
            },
            "train_set_mods": {
                "mask_ratio": 0.6,
                "inplace": false,
                "mask": 0
            },
            "test_set_mods": {
                "mask_ratio": 0.6,
                "inplace": false,
                "mask": 0
            }

        }
    }


    createCollapsible(configuration, index) {
        return <Collapsible
            key={index}
            trigger={createCollapsibleHeader(`Configuration #` + index)}
        >
            <Card variant="outlined">
                {generateInputs(configuration, "Default config")}
            </Card>
        </Collapsible>
    }

    sendLearningRequest() {
        console.log("Not implemented")
    }


    render() {
        return (
            <div style={{width: "50%", top: "10px", marginBottom: "10%"}}>
                <button onClick={this.addCollapsibleOnBtnClick} style={{padding: "30px", margin: "30px"}}>Add input
                </button>
                <button onClick={this.sendLearningRequest} style={{padding: "30px", margin: "30px"}}>Train Models
                </button>
                {this.state.configurationList.map((value, index) => {
                    return this.createCollapsible(value, index)
                })}
            </div>
        )
    }
}

export default ConfigurationView;
