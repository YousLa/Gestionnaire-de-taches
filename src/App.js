// Ici j'importe les éléments dont j'ai besoin
import logo from './logo.svg';
import logoPink from './logo-pink.svg';
import './App.css';


// Toujours commencer un composant par une lettre capitale
const AppLink = () => {
  const VARIABLE = "React";
  return (
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn {VARIABLE} {9 * 3}+
    </a>)
}

const Logo = (logo) => <img id="logo" src={logo} className="App-logo" alt="logo" />

function App() {
  // Fonction gestionnaire qui changer de logo suite à une action
  const handleOnClick = (svg) => {
    const LOGO = document.getElementById("logo");
    LOGO.src = svg;
  }
  return (
    <div className="App">
      <header className="App-header">
        {/* Ici j'affiche le COMPOSANT Logo */}
        <Logo />

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* Ici j'affiche le COMPOSANT AppLink */}
        <AppLink />

        {/* C'est comme ça que l'on rajoute un addEventListener en React */}
        <button onClick={() => handleOnClick(logo)}>blue</button>
        <button onClick={() => handleOnClick(logoPink)}>pink</button>

      </header>
    </div>
  );
}

export default App;
