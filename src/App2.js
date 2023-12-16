// ! COURS LINKEDIN LEARNING
// Ici j'importe les éléments dont j'ai besoin
// import logo from './logo.svg';
// import logoPink from './logo-pink.svg';
import './App.css';
// On importe useState & useEffect à partir du module react
import { useState, useEffect } from "react";

// ======================================================================================

// Toujours commencer un composant par une lettre capitale
// ~ 1) const AppLink = () => {
//   const VARIABLE = "React";
//   return (
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn {VARIABLE} {9 * 3}+
//     </a>)
// }

// ======================================================================================

// * 2) Composant Logo
// const Logo = (logo) => <img id="logo" src={logo} className="App-logo" alt="logo" />

// ======================================================================================

// & 3) Composant Title
// const Title = ({ content }) => <h1 id="titleID">{content}</h1>

// & 3) Composant Component avec propos => title & onClick
// Button sur lequel on met un listener dans lequel on utilise le pros onClick et le title
// const Component = ({ titleProp, onClickProp }) => <button onClick={() => onClickProp(titleProp)}> Learn {titleProp} </button>

// ======================================================================================

// Composant => props {title, link}
// ^ 4) Composant réutilisable
// const Component = ({ title, link }) => {
//   return (
//     // Elément parent obligatoire => Fragment <> </> 
//     <>
//       {/* Element adjacent */}
//       <a
//         className="App-link"
//         href={link}
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Learn {title}
//       </a><br />
//     </>
//   )
// }

/* ====================================================================================== */
// ! 5) Composant Counter sous forme de fonction 
// function Counter({ countPropriete, incrementPropriete }) {
//   return (
//     <div>
//       <p>You clicked {countPropriete} times</p>
//       <button onClick={() => incrementPropriete(countPropriete => countPropriete + 1)}>Click</button>
//     </div>
//   )
// }

// ! 5) Composant Result sous forme de fonction flêchée
// On met une propriété lorsque l'on à besoin de transmettre l'information
// const Result = ({ resultPropriete }) => <h1 className="result">{resultPropriete}</h1>

/* ====================================================================================== */

// ? 6) LIST
// Composant Header
// function Header({ titleProp }) {
//   return (
//     <h1>{titleProp}</h1>
//   )
// }

// Composant Component
// function Component({ titlePropProp, onClickProp }) {

//   return (
//     <div className="componentClass">
//       <p>{titlePropProp}</p>
//       <button onClick={() => onClickProp(titlePropProp)}> Click me ! </button>
//     </div>
//   )
// }

/* ====================================================================================== */

function App() {

  // * 2) Fonction gestionnaire qui changer de logo suite à une action
  // const handleOnClick = (svg) => {
  //   const LOGO = document.getElementById("logo");
  //   LOGO.src = svg;
  // }

  // ======================================================================================

  // & 3) Hook useState
  // !/!\! Erreur de compréhension, correction et explication (caca être moi)
  // Création de la variable d'état appelée => titleProp | avec une valeur initiale => "React" 
  // Fonction => setTitle | qui peut être utilisé pour mettre à jour la valeur de titleProp |
  // useState => renvoie un tableau où le premier élément est la valeur actuelle de l'était => titleProp
  // const [titleProp, setTitle] = useState("React");
  // const handleOnClick = (lib) => setTitle(lib);

  // & 3) Hook useEffect permet d'appliquer des effets de bord au moment du chargement du composant
  // Paramètre 1 {} => Fonction de rappel qui va indiquer les effets de bord à appliquer
  // Paramètre 2 [] => Tableau dans lequel on va spécifier des dépendances, React va surveiller les changements qu'il y a dans ces dépendances pour appliquer des effets de bord lorsqu'il y aura un changement d'état.
  // Ici on met [title], donc lorsqu'il y aura un changement d'état concernant title que react va appliquer des effets de bord pour changer l'affichage qui va correspondre à title
  // useEffect(() => {
  //   document.titleID = `Learn ${titleProp}`;
  // }, [titleProp])

  // ======================================================================================

  // ! 5) Les règles de hooks
  // ! Les hooks doivent être utilser à l'intérieur d'un composant fonction au niveau supérieur
  // Etat local
  // const [count1Var, setCount1Var] = useState(0);
  // const [count2Var, setCount2Var] = useState(0);
  // const [resultVar, setResultVar] = useState(0);

  // $ Effet de bord Lorsque l'on va changer les valeurs des compteurs, cela va également changer le résultat. 
  // En paramètre 1 on lui dit d'aditionner les compteurs. 
  // En paramètre 2 on lui demande de surveiller les changements
  // useEffect(() => setResultVar(count1Var + count2Var), [count1Var, count2Var])

  // ======================================================================================

  // ? 6) LIST : Tableau Libraries qui contient des objets
  // const libraries = [
  //   { titleTab: "React", linkTab: "https://reactjs.org" },
  //   { titleTab: "Angular", linkTab: "https://angular.io" },
  //   { titleTab: "Vue", linkTab: "https://vuejs.org" },
  //   { titleTab: "Bootstrap", linkTab: "https://boostrap.be" },
  // ];

  // Double const dans laquelle on utilise le hook useState, état de départ => "React"
  // const [titleConst, setTitleConst] = useState("React");

  // Const avec un fonction fleché à un paramètre => value dans laquelle on utilise setTitle avec comme paramètre value
  // const handleOnClick = (value) => setTitleConst(value);

  /* ====================================================================================== */

  return (
    <div className="App">
      <header className="App-header">
        {/* ====================================================================================== */}

        {/* ~ 1) Composant Applink*/}
        {/* <AppLink /> */}

        {/* ====================================================================================== */}

        {/* * 2) Composant Logo*/}
        {/* <Logo /> */}

        {/* C'est comme ça que l'on rajoute un addEventListener en React */}
        {/* <button onClick={() => handleOnClick(logo)}>blue</button>
        <button onClick={() => handleOnClick(logoPink)}>pink</button> */}

        {/* ====================================================================================== */}

        {/*  & 3) Composant Title avec prop => content*/}
        {/* <Title content={titleProp} /> */}


        {/* & 3) Composant Component */}
        {/* <Component onClickProp={handleOnClick} titleProp="React" />
        <Component onClickProp={handleOnClick} titleProp="Vue" />
        <Component onClickProp={handleOnClick} titleProp="Angular" /> */}

        {/* ====================================================================================== */}

        {/* ^ 4) Composant Component avec props => title & link */}
        {/* On utilise le même composant avec les même props mais avec des valeurs différentes */}
        {/* <Component title="React" link="https://reactjs.org" />
        <Component title="Vue" link="https://vuejs.org" />
        <Component title="Angular" link="https://angularjs.io" /> */}

        {/* ====================================================================================== */}

        {/* ! 5) Ici on affiche le résultat */}
        {/* <Result resultPropriete={resultVar} />

        <Counter countPropriete={count1Var} incrementPropriete={setCount1Var} />
        <Counter countPropriete={count2Var} incrementPropriete={setCount2Var} /> */}

        {/* ====================================================================================== */}

        {/* ? 6) LIST */}
        {/* Composant Header */}
        {/* <Header titleProp={titleConst} /> */}

        {/* Expression javascript qui va permettre une itération */}
        {/* map Fonction d'ordre supérieur qui va nous permettre de parcourir chaque élément d'un objet de type tableau */}
        {/* Donc pour chaque élément de mon tableau, il va utilisé le composant component avec pour chacune des propriétés, les clés et valeur de mon tableau */}
        {/* {libraries.map(lib => {

          return (
            <Component titlePropProp={lib.titleTab} linkProp={lib.linkTab} onClickProp={handleOnClick} />
          )
        })} */}

        {/* ====================================================================================== */}

        {/* Composant Component */}

      </header>
    </div>
  );
}

export default App;
