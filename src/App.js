// ! COURS LINKEDIN LEARNING
// Créer une formulaire

// Importation du hook => useState | depuis react, qui permet de gérer l'état local d'un composant
import { useState } from "react";
import './App.css';

// Composant => Header 
// Composant simple qui retourne un <h1>
function Header() {
  return (
    <h1>Les librairies Front</h1>
  )
}

// Composant fonctionnel => Component | qui prend 3 Props => {title}, {link} & {isSelected} 
// Il retourne un <li> avec une classe conditionnelle basée sur la propriété => isSelected |
// Il contien un lien avec les props => titleC & linkC |
function Component({ titleC, linkC, isSelected }) {
  return (
    <li className={isSelected ? "component blue" : "component"}>
      <a href={linkC} target="_blank" rel="nonopener noreferrer">{titleC}</a>
    </li>
  )
}

// Composant => Form | qui prend 2 Props => onSubmitF & onChangeF | 
// Il retourne un formulaire avec 2 champs => input | pour le titre et le lien.
// TODO Les évènements onChange et onSubmit sont associés
function Form({ onSubmitF, onChangeF }) {
  return (
    <form onSubmit={onSubmitF} className="flex space-between">
      <input type="text" onChange={onChangeF} name="title" placeholder="title" />
      <input type="text" onChange={onChangeF} name="link" placeholder="link" />
      <button type="submit">add</button>
    </form>
  )
}

// Composant App
// C'est le composant principal de notre appplication.
function App() {

  // Tableau => libraries de type objet avec des propriétés => {titleL} & {linkL}
  const libraries = [
    { titleL: "React", linkL: "https://reactjs.org/" },
    { titleL: "Angular", linkL: "https://angular.io/" },
    { titleL: "Vue", linkL: "https://vuejs.org/" },
    { titleL: "Bootstrap", linkL: "https://getboostrap.com/" }
  ]

  // Hook useState
  // Ici on déclare 2 états locaux => input & items
  // input => est utilisé pour suivre les valeurs des champs de saisie dans le formulaire
  // items => est utilisé pour suivre la liste des librairies affichées
  const [input, setInput] = useState(null);
  const [items, setItems] = useState(libraries);

  // Fonctions handleOnChange & handleOnSubmit
  // handleOnChange => est appelé à chaque modification dans les champs de saisie. Il met à jour l'état input en utilisant la valeur actuelle du champ modifié
  // ^ e : Est l'objet représentant l'événement (dans ce cas, un évènement de changement) qui a déclenché la fonction
  // ^ e.target : Est l'élément DOM sur lequel l'événement à été déclenché (dans ce cas, le champ de saisie)
  // ^ e.target.name : Est la propriété name de l'élément DOM qui a déclenché l'évènement. Ici, cela pourrait être => title ou link | en fonction du champ qui a été modifié.
  // ^ e.target.value : Est la valeur actuelle du champ de saisie
  // * On utilise la syntaxe des objets spread ('...') pour créer une copie de l'objet => input |
  // * Ensuite elle met à jour la propriété correspondante ([e.target.name] => title ou link) avec la nouvelle valeur du champ de saisie (e.target.value)
  const handleOnChange = e => setInput({ ...input, [e.target.name]: e.target.value });

  // handleOnSubmit => est appelé lors de la soumission du formulaire. Il empêche la soumission si l'un de champs (title ou link) est vide.
  const handleOnSubmit = e => {
    // ^ e : représente l'objet de l'événement
    // ^ e.preventDefault() : Cette ligne empêche le comportement par défaut du formulaire, qui serait de recharger la page lors de la soumission. On reste sur la même page et on effectue le traitement en JS
    e.preventDefault();

    // ^ input?.title : L'opérateur optionnel de chaîne (?.) est une fonctionnalité JS qui permet de vérifier si l'objet => input et s'il a une propriété => title. Cela évite une erreur si => input etst nul ou non défini. 
    // ^ Si => input | existe et à une propriété title, alors input?.title renvoie sa valeur. Sinon il renvoie undefined. Pareil pour input.link
    //  ^ Si input n'existe pas ou s'il manque soit title, soit link alors la condition est vraie.
    // ^ Si la condition est vraie, on retourne false et le formulaire ne sera pas soumis.
    if (!input?.title || !input?.link) { return false }
    // Il ajoute une nouvelle librairie à la liste items en utilisant les valeurs actuelle de input
    // ^ Si les champs ne sont pas vides, cette ligne de code ajoute un nouvel objet à la liste items. Cet objet est crée à partir des valeurs actuelles de input.title et input.link et la liste itemps existante est étendue à l'aide de l'opérateur spread (...)
    setItems([{ titleL: input.title, linkL: input.link }, ...items]);
    // et réinitialise input à null
    setInput(null);
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* Ici on affiche le composant Header */}
        <Header />

        {/* Ici on affiche le composant Form */}
        <Form onChangeF={handleOnChange} onSubmitF={handleOnSubmit} />
        <ul className="list">
          {/* On utilise la méthode map pour itérer sur le tableau items et créer dynamiquement des composants => Component | pour chaque librairie. */}
          {items.map((lib, i) => {
            return (
              <Component
                // La clé est utilisé pour aider React à identifier chaque composant de manière unique et optimiser les mises à jour du DOM.
                key={lib.linkL}
                titleC={lib.titleL}
                index={i}
                linkC={lib.linkL}
              />
            )
          })}
        </ul>

      </header>
    </div>
  );
}

export default App;
