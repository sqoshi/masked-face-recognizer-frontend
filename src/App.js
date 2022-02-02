import './App.css';
import ConfigurationView from "./components/configuration/ConfigurationView/ConfigurationView";
import EntitiesList from "./components/results_visualization/EntitiesList/List";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <ConfigurationView></ConfigurationView>
                {/*<p>Analysis visualization</p>*/}
                {/*<EntitiesList fetch_url="http://127.0.0.1:8668/output"/>*/}
            </header>
        </div>
    );
}

export default App;
