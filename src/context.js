import { createContext, useReducer, useContext } from "react"

const Context = createContext();
const { Provider, Consumer } = Context;

const todos = [
    { id: 1, content: "pay bills", done: true },
    { id: 2, content: "learn React", done: false },
];

// ^ initialState : Etat initial de l'application avec une liste de tâches (items), une liste complètes de tâches (all) et l'entrée utilisateur (input).
const initialState = {
    // * Items : est un tableau qui contient des objets représentant des tâches. 
    // * Propriétés :
    // * idI : un identifiant unique associé à la tâche
    // * contentI : Le contenu de la tâche
    // * doneI : Un indicateur indiquant si la tâches est terminée => true | ou non => false
    items: todos,
    // * All : est également un tableau de tâches conenant toutes les tâches
    all: todos,

    options: ["All", "Completed"],
    // * input : Cette propriété est initialement définie sur => null | 
    input: null
}

// ^ Fonction de réduction qui spécifie comment l'état de l'application évolue en réponses à des actions.
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
            // * la propriété => doneI est mise à jour avec la valeur booléenne (action)
            const updated = state.items.map(item => item.idI === action.payload.idH ? { ...item, doneI: action.payload.boolH } : item);
            return {
                ...state,
                items: updated,
                all: updated
            }
        case 'select':
            const filtered = state.items.filter(item => item.doneI);
            return {
                ...state,
                items: action.payload.option === "Completed" ? filtered : state.all,
            }
        default:
            throw new Error();
    }
}

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export const withContext = Component => props => {
    return <Consumer>{value => <Component {...value} {...props} />}</Consumer>
}

export const useAppContext = () => {
    return useContext(Context)
}
export default AppProvider;