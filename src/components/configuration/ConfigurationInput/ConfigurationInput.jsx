import {Component} from "react";
import {Input} from "@mui/material";

const configInputStyles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
    width: "100%"
}
const labelStyles = {flex: 1, textAlign: "left", paddingRight: "20px"}

class ConfigurationInput extends Component {
    render() {
        return (
            <div style={configInputStyles}>
                <label htmlFor="Student" style={labelStyles}>{this.props.label}</label>
                <Input autoFocus={true} name={this.props.label} value={this.props.defaultValue} style={{flex: 1}}/>
            </div>

        )
    }
}


export default ConfigurationInput