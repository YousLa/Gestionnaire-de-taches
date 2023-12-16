// ! COURS LINKEDIN LEARNING
// Créer une formulaire
import { useState } from "react";
import './App.css';

// Composant => Header 
function Header() {
  return (
    <h1>Les librairies Front</h1>
  )
}

// Composant => Component | Props => {title}, {link} & {isSelected} 
function Component({ titleC, linkC, isSelected }) {
  return (
    <li className={isSelected ? "component blue" : "component"}>
      <a href={linkC} target="_blank" rel="nonopener noreferrer">
        {titleC}
      </a>
    </li>
  )
}

function Form({ onSubmitF, onChangeF }) {
  return (
    <>
      <form>
        <input type="text" onChange={onChangeF} name="title" placeholder="title" />
        <input type="text" onChange={onChangeF} name="link" placeholder="link" />
        <button type="submit">add</button>
      </form><br />
    </>
  )
}


function App() {

  const libraries = [
    { titleL: "React", linkL: "https://reactjs.org/" },
    { titleL: "Angular", linkL: "https://angular.io/" },
    { titleL: "Vue", linkL: "https://vuejs.org/" },
    { titleL: "Bootstrap", linkL: "https://getboostrap.com/" }
  ]

  const [input, setInput] = useState(null);
  const [items, setItems] = useState(libraries);

  const handleOnChange = e => setInput({ ...input, [e.target.name]: e.target.value });
  const handleOnSubmit = e => {
    e.preventDefault()
    // setItems
  }

  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Form onChangeF={handleOnChange} onSubmit={handleOnSubmit} />
        {items.map((lib, i) => {
          return (
            <Component
              key={lib.linkL}
              titleC={lib.titleL}
              index={i}
              linkC={lib.linkL}
            />)
        })}


      </header>
    </div>
  );
}

export default App;
