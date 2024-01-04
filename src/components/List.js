// ^ On importe le hook => useAppContext | depuis le fichier de contexte => context.js | car Select utilise le contexte de l'application pour accéder à l'état global et à la fonction de dispatch.
import { useAppContext } from '../context';

// ^ Composant fonctionnel => Item | pour représenter une tâche dans la liste avec une case à cocher.
// * Le composant => Item | prend trois propriétés => id, content, done | qui représentent une tâche.
function Item({ id, content, done }) {

    // * On utilise le hook => useAppContext | pour obtenir le dispatch à partir du contexte de l'application.
    const { dispatch } = useAppContext();

    // * On gère le changement d'état de la case à cocher. Lorsque la case à cocher est cochée ou décochée, cela dispatche une action de cocher. Lorsque la case à cocher est cochée ou décochée, cela dispatche une action de type => check | avec l'id de la tâche et le nouvel état de la case à cocher.
    const handleOnCheck = e => {
        dispatch({ type: "check", payload: { id, bool: e.target.checked } })
    }

    // * On détermine la classe CSS à appliquer en fonction de l'état de la tâche => done |.
    const isDone = done ? "mx-3 item-done" : "mx-3";

    // * Le rendu du composant est un élément li représentant une tâche. Il contient une case à cocher avec un label invisible, dont l'état est déterminé par la propriété => done. Lorsque la case à cocher change, la fonctione => handleOnCheck est appelée. Ensuite, il y a un élément span contenant le contenu d ela tâche avce une classe CSS conditionnelle => isDone basée sur l'état de la tâche.
    return (
        <li className="list-group-item">
            <input className="form-check-input" type="checkbox" aria-label="..." checked={done} onChange={handleOnCheck} />
            <span className={isDone}>{content}</span>
        </li>
    )
}

// ^ Composant fonctionnel => List | pour représenter la liste complète de tâches ne prend pas de propriétés epxlicites.
function List() {
    // * on utilise le hook => useAppContext | pour obtenir l'état global => state | à partir du contexte de l'application
    const { state } = useAppContext();

    return (
        <ul className="list-group">
            {/* li générés en utilisant map sur le tableau state.items. Chaque élément Item est rendu avec les propriétés de la tâche (id,, contenu, état). La clé est définice comme l'id de la tâche pour aider React à identifier et gérer efficacement les éléments de la liste. */}
            {state.items.map(item => <Item key={item.id} {...item} />)}
        </ul>
    )
}

export default List;