// & Ce fichier définit un contexte React pour gérer l'état global de l'application à l'aide du hook => useReducer. il utilise également les hooks => createContext & useContext | pour créer et consommer le contexte, ainsi que les composants <Provider> et <Consumer> pour fournir et consommer les valeurs du contexte.

// ^ useReducer : Hook pour gérer les états avec des actions et un reducer.
import { createContext, useReducer, useContext } from "react"

// ^ createContext crée un objet de contexte React, et Provider et Consumer sont extraits de cet objet. 
const Context = createContext();
const { Provider, Consumer } = Context;

// ^ todos = Liste de tâche initial
const todos = [
    { id: 1, content: "Devoir de math sur les matrices.", done: true },
    { id: 2, content: "Finir le cours LinkedIn Learning sur React.", done: true },
    { id: 3, content: "Créer mon portfolio.", done: false },
];

// ^ initialState : Etat initial de l'application avec une liste de tâches (items), une liste complètes de tâches (all), des options pour le menu déroulant et l'entrée utilisateur (input).
const initialState = {
    // * Items : est un tableau qui contient des objets représentant des tâches. 
    // * Propriétés :
    // * id : un identifiant unique associé à la tâche
    // * content : Le contenu de la tâche
    // * done : Un indicateur indiquant si la tâches est terminée => true | ou non => false
    items: todos,
    // * All : est également un tableau de tâches conenant toutes les tâches
    all: todos,

    options: ["Tout", "Terminé"],
    // * input : Cette propriété est initialement définie sur => null | 
    input: null
}

// ^ Fonction de réduction qui spécifie comment l'état de l'application évolue en réponses aux actions. Chaque case du switch gère une action spécifique.
// * Le paramètre => state | représente l'état actuel de l'application, et => action | est un objet qui décrit quelle action doit être effectuée.
function reducer(state, action) {
    // Lié avec les fonctions fleché => handleOnSubmit | handleOnChange | handleOnCheck | handleOnSelect
    switch (action.type) {
        // * Cette partie gère l'action de soumission (submit) d'un formulaire pour ajouter une nouvelle tâche
        // * Elle renvoie un nouvel état de la liste => items | en ajoutant la nouvelle tâche (action.payload.item)
        // * Elle met également à jour la liste => all |
        case 'submit':
            return {
                ...state,
                items: [...state.items, action.payload.item],
                all: [...state.items, action.payload.item],
                input: null,
            }
        // * Cette partie gère l'action de changement dans le champ du formulaire => saisie de l'utilisateur
        // * elle renvoie un nouvel état avec la propriété => input | mise à jour (action.payload.value)
        case 'change':
            return {
                ...state,
                input: action.payload.value
            }
        // * Cette partie gère l'action de cocher ou décocher une tâche.
        // * Elle renvoie un nouvel état de la liste => items.
        case 'check':
            // * l'id de la tâche est mise à jour avec la valeur (action.payload.idH)
            // * la propriété => done est mise à jour avec la valeur booléenne (action)
            const updated = state.items.map(item => item.id === action.payload.id ? { ...item, done: action.payload.bool } : item);
            return {
                ...state,
                items: updated,
                all: updated
            }
        case 'select':
            const filtered = state.items.filter(item => item.done);
            return {
                ...state,
                items: action.payload.option === "Terminé" ? filtered : state.all,
            }
        default:
            throw new Error();
    }
}

// ^ AppProvider est un composant fonctionnel qui prendre un seul argument => children | représentant les éléments enfants à envelopper dans le contexte. Il utilise le => Provider | du contexte pour envelopper ses enfants avec le contexte global, en fournissant state et dispatch comme valeurs du contexte.
const AppProvider = ({ children }) => {

    // * On utilise le hook => useReducer | pour créer un état => state et une fonction dispatch, en utilisant le réducteur => reducer | et l'état initial => initialState.
    const [state, dispatch] = useReducer(reducer, initialState);

    // *On renvoie le composant <Provider> du contexte, en lui fournissant comme valeur le state et la fonction dispatch générés par le hook => useReducer |. Les éléments enfants sont enveloppés dans ce contexte, leur donnat accès aux valeurs du contexte.
    return <Provider value={{ state, dispatch }}>{children}</Provider>
}

// ^ withContext est un Higher-Order Component (HOC) qui prend un composant => Component et renvoie une fonction qui prend de propriétés. Ce HOC est utilisé pour envelopper d'autres composants avec le contexte.
export const withContext = Component => props => {

    // * On utilise le Consumer du contexte pour consommer les valeurs du contexte => value | et les transmet au composant enveloppé => Component |. Les propriétés originales => props | sont également transmises.
    return <Consumer>{value => <Component {...value} {...props} />}</Consumer>
}

// ^ useAppContext est un hook utilitaire qui utilise => useContext | pour récupérer les valeurs du contexte.
export const useAppContext = () => {

    // ^ Ce hook renvoie directement l'objet de valeurs du contexte (dans ce cas, state et dispatch)
    return useContext(Context)
}

// ^ On exporte le composant AppProvider, ce qui permet de l'utiliser pour englober l'ensemble de l'application avec le contexte global.
export default AppProvider;