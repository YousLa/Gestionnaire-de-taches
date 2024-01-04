// ^ On importe le hook => useAppContext | depuis le fichier de contexte => context.js | car Select utilise le contexte de l'application pour accéder à l'état global et à la fonction de dispatch.
import { useAppContext } from '../context';

// ^ Composant fonctionnel => Select | pour sélectionner dans le menu déroulant "Tout" et "Terminé"
function Select() {
    // * On utilise le hook => useAppContext pour obtenir le dispatch à partir du contexte de l'application.
    const { dispatch } = useAppContext();

    // * On définit un tableau => options | avec les valeurs "Tout" et "Terminé". Ces options seront utilisées pour le menu déroulant.
    const options = ["Tout", "Terminé"];

    // * On gère les changements de sélection dans le menu déroulant. Lorsqu'une option est sélectionnée, elle dispatche une action de type => select | avec l'option sélectionnée comme payload.
    const handleOnSelect = e => {
        dispatch({ type: "select", payload: { option: e.target.value } })
    }

    return (
        <div className="d-flex justify-content-end align-items-center my-3 ">
            <select onChange={handleOnSelect} className="select form-select form-control form-control-sm">
                {/* Cela utilisé la méthode => map | sur le tableau => otpions | pour créer un ensemble d'éléments <option> dans le JSX de React. */}
                {/* map est une méthode  de tableau en JavaScript qui itère sur chaque élément du tableau et renvoie un nouveau tableau résultant de l'application d'une fonction à chaque élément. */}
                {/* Ici, on itère sur chaque élément => option | est transformée en un élément  <option> dans le JSX de React */}
                {options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
        </div>
    )
}

export default Select