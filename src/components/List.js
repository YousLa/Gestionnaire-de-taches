import { useAppContext } from '../context';

// ^ Composant fonctionnel => Item | pour représenter une tâche dans la liste avec une case à cocher.
// fonction onCheck utilisé ici en prop onCheckI => error
function Item({ id, content, done }) {
    const { dispatch } = useAppContext();

    const handleOnCheck = e => {
        dispatch({ type: "check", payload: { id, boolH: e.target.checked } })
    }

    const isDone = done ? "mmx-3 item-done" : "mx-3";
    return (
        <li className="list-group-item">
            <input className="form-check-input" type="checkbox" aria-label="..." checked={done} onChange={handleOnCheck} />
            <span className={isDone}>{content}</span>
        </li>
    )
}

// ^ Composant fonctionnel => List | pour représenter la liste complète de tâches
function List({ }) {
    const { state } = useAppContext();

    return (
        <ul className="list-group">
            {state.items.map(item => <Item key={item.id} {...item} />)}
        </ul>
    )
}

export default List;