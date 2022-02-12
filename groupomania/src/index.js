import logo from "./Logos/Logo-Groupomania.png";
import "./styles/index.css";
import "./styles/Normalize.css";
import Header from "./components/header";
import reportWebVitals from "./reportWebVitals";

function App() {
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/index.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
export default App;
reportWebVitals();
