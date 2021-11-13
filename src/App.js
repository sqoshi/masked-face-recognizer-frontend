import './App.css';
import EntitiesList from "./components/EntitiesList/List";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <p>Analysis visualization</p>
          <EntitiesList fetch_url="http://127.0.0.1:8668/output"/>
      </header>
    </div>
  );
}

export default App;
