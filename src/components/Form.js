// ^ usemMemo : Hook pour mémoriser la valeur calculée entre les rendus.
// ^ useRef : Hook pour créer une référence mutable qui persiste à travers les rendus.
// ^ uuid : Bibliothèque pour générer des identifiants uniques. 
// ^ useAppContext : est un hook personnalisé utilisé pour accéder au contexte de l'application.

import { useMemo, useRef } from "react";
import { v4 as uuid } from "uuid";
import { useAppContext } from '../context';

// * Composant fonctionnel => Form | avec un formulaire pour ajouter de nouvelles tâches.
const Form = () => {

    // * On utilise => useRef | pour créer une référence mutable => ref | qui sera attachée à l'élément d'entrée du formulaire. 
    const ref = useRef();

    // * On utilise useAppContext pour obtenir l'état global => state | et la fonction de dispatch à partir du contexte de l'application
    const { state, dispatch } = useAppContext()

    // * handleOnChange gère les changements de l'entrée du formulaire et dispatche une action de type => change | avec la nouvelle valeur
    const handleOnChange = e => dispatch({ type: "change", payload: { value: e.target.value } });

    // * handleOnSubmit gère la soumission du formulaire. Si l'entrée est valide, il dispatche une action de type => submit | avec une nouvelle tâche contenant un identifiant unique généré par => uuid |, le contenu de l'entrée et l'état "done" inital à false.
    const handleOnSubmit = e => {
        e.preventDefault();
        if (isValid) {
            dispatch({ type: "submit", payload: { item: { id: uuid(), content: state.input, done: false } } });
            ref.current.value = null;
        }
    }

    // * Utilise => useMemo | pour mémoriser la validité de l'entrée. Il est vrai si => state.input | n'est pas vide, sinon c'est faux.
    const isValid = useMemo(() => !!state.input, [state.input]);

    // * Le rendu du formulaire consiste en un formulaire HTML avec un champ d'entrée et un bouton d'envoi. L'élément d'entrée utilise => ref pour pouvoir être manipulé impérativement, et le bouton déclence la fonction => handleOnSubmit lorsqu'il est cliqué.
    return (
        <form className="input-group mb-3" onSubmit={handleOnSubmit}>
            <input
                ref={ref}
                type="text"
                className="form-control form-control-lg mx-0"
                placeholder="Ajouter une tâche"
                style={{ height: "max-content" }}
                onChange={handleOnChange} />
            <button type="submit" className="btn btn-info text-white">Ajouter</button>
        </form>
    )
}

export default Form;