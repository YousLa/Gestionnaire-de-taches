// ! COURS LINKEDIN LEARNING
import './App.css';
// On importe useState & useEffect à partir du module react
import { useState } from "react";

// COMPOSANT Header
// Composant Header => Propriété {titleH} => return un <h1> avec la propriété {titleH}
function Header({ titleH }) {
  return (
    <h1>{titleH}</h1>
  )
}

// COMPOSANT Component
// Composant Component => Propriété {titleC, indexC, linkC, onclickC, isSelected} => return une div avec un lien et un bouton
// Lorsque le bouton est cliqué, la fonction => onClickC | est appelé avec les valeurs de => titleC & indexC en tant qu'arguments
function Component({ titleC, indexC, linkC, onClickC, isSelected }) {
  return (
    <div className={isSelected ? "componentClass orange" : "componentClass"}>
      <p>
        <a href={linkC} target="_blank" rel="nonopener noreferrer">
          {titleC}
        </a>
      </p>

      <button onClick={() => onClickC(titleC, indexC)}> Click me !</button>
    </div>
  )
}

function App() {

  // Tableau libraries de type Objet avec comme propriétés => titleT et linkT
  const libraries = [
    { titleT: "React", linkT: "https://reactjs.org" },
    { titleT: "Angular", linkT: "https://angular.io" },
    { titleT: "Vue", linkT: "https://vuejs.org" },
    { titleT: "Bootstrap", linkT: "https://getbootstrap.com" },
  ];

  // Utilisation du hook d'état useState
  // Création d'une variable d'état => indexState | avec pour état initiale => 0
  // la fonction => setIndex | peut être utilisée pour mettre à jour la valeur => indexState
  // Le hook useState | renvoie un tableau où le premier élément est la valeur actuelle de l'état => index
  const [indexState, setIndex] = useState(0);

  // Utilisation du hook d'état useState
  // Création d'une variable d'état => titleState | avec pour état initiale => "React"
  // la fonction => setTitle | peut être utilisée pour mettre à jour la valeur => titleState
  // Le hook useState | renvoie un tableau où le premier élément est la valeur actuelle de l'état => title
  const [titleState, setTitle] = useState("React");

  // Fonction => handleOnClick | prends 2 arguments => valueHOC & indexHOC
  // Lorsque l'on clique sur le bouton du Composant => Component |, elle met à jour les états => titleState & indexState | avec les valeurs mises en paramètres
  function handleOnClick(valueHOC, indexHOC) {
    setTitle(valueHOC);
    setIndex(indexHOC);
  }

  return (
    <div className="App">
      <header className="App-header">

        {/* On affiche le Composant => Header | avec comme propriété => titleH | la variable d'état => titleState | */}
        <Header titleH={titleState} />
        {/* On utilise la fonction => map sur le tableau => libraries | pour créer dynamiquement des composants => Component | pour chaque bibliothèque du tableau*/}
        {/* lib => est la varibale qui reçoit la valeur de l'élément courant du tableau => titleT & linktT */}
        {/* i => est la variable qui reçoit l'index de l'élément courant dans le tableau => 0, 1, 2, ... */}
        {/* (lib, i) déstructure chaque objet du tableau libraries pendant l'itération de la fonction => map | */}
        {/* Permettant d'accéder facilument aux propriétés de chaque bibliothèque => lib | et à leur position dans le tableau => i | */}
        {libraries.map((lib, i) => {
          return (
            // Pour chaque => lib | du tableau => libraries | un composant => Component | est créé avec les propriétés suivantes :
            <Component
              // La propriété => isSelected | est définie en fonction de la comparaison entre l'index actuel => i de la bibliothèque du tableau libraries | et de la valeur de l'état => indexState de la fonction d'état | 
              isSelected={indexState === i}
              // L'attribut key est utilisé par React pour identifier de manière unique chaque élément généré lors du rendu d'un tableau d'éléments. 
              // Cela permet à React de suivre les modifications apportées à la liste et d'optimiser les mises à jour du DOM.
              // C'est ainsi que React comprends quel élément à été ajouté, supprimé ou modifié dans le tableau lors d'une mise à jour
              // En résumé cela permet d'assurer des performances otpimales et un suivi des modifications d'état.
              key={lib.linkT}
              // Transmet le titre de la bibliothèque du tableau au composant Component
              titleC={lib.titleT}
              // Transmet l'index
              indexC={i}
              // Transmet le lien
              linkC={lib.linkT}
              // Transmet la fonction handleOnclick
              onClickC={handleOnClick}
            />)
        })}

      </header>
    </div>
  );
}

export default App;
