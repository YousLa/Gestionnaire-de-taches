// ^ useState : Hook pour gérer les états dans le composants fonctionnels.
// ^ usemMemo : Hook pour mémoriser la valeur calculée entre les rendus.
// ^ useRef : Hook pour créer une référence mutable qui persiste à travers les rendus.
// ^ forwardRed : Fonction pour transférer les références aux composants enfants.
// ^ useReducer : Hook pour gérer les états avec des actions et un reducer.
// ^uuid : Bibliothèque pour générer des identifiants uniques.
import { useMemo, useRef, forwardRef } from "react";
import { useAppContext } from './context';
import { v4 as uuid } from "uuid";
import './App.css';



// ^ Composant fonctionnel => Container | qui représente un conteneur stylisé avec des props => {title} & {children}
const Container = ({ children, title }) => {
  return (
    <div className="container py-3">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col">
          <div className="card" id="list1" style={{ borderRadius: ".15rem" }}>
            <div className="card-body py-4 px-4 px-md-5">
              <h1 className="text-info mb-3">{title}</h1>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>)
}



// ^ Composant fonctionnel => Form | avec un formulaire pour ajouter de nouvelles tâches.
const Form = () => {
  const ref = useRef();
  const { state, dispatch } = useAppContext()
  const handleOnChange = e => dispatch({ type: "change", payload: { value: e.target.value } });
  const handleOnSubmit = e => {
    e.preventDefault();
    if (isValid) {
      dispatch({ type: "submit", payload: { item: { idI: uuid(), contentI: state.input, doneI: false } } });
      ref.current.value = null;
    }
  }
  const isValid = useMemo(() => !!state.input, [state.input]);
  return (

    <form className="input-group mb-3" onSubmit={handleOnSubmit}>
      <input
        ref={ref}
        type="text"
        className="form-control form-control-lg mx-0"
        placeholder="Add new..."
        style={{ height: "max-content" }}
        onChange={handleOnChange} />
      <button type="submit" className="btn btn-info">Add</button>
    </form>
  )
}

// ^ Composant fonctionnel => Select | pour sélectionner dans le menu déroulant "All" et "Completed"
function Select() {
  const options = ["All", "Completed"];
  const { dispatch } = useAppContext();
  const handleOnSelect = e => {
    dispatch({ type: "select", payload: { option: e.target.value } })
  }
  return (
    <div className="d-flex justify-content-end align-items-center my-3 ">
      <select onChange={handleOnSelect} className="select form-select form-control form-control-sm">
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  )
}

// ^ Composant fonctionnel => Item | pour représenter une tâche dans la liste avec une case à cocher.
// fonction onCheck utilisé ici en prop onCheckI => error
function Item({ idI, contentI, doneI }) {
  const { dispatch } = useAppContext();

  const handleOnCheck = e => {
    dispatch({ type: "check", payload: { idI, boolH: e.target.checked } })
  }

  const isDone = doneI ? "mmx-3 item-done" : "mx-3";
  return (
    <li className="list-group-item">
      <input className="form-check-input" type="checkbox" aria-label="..." checked={doneI} onChange={handleOnCheck} />
      <span className={isDone}>{contentI}</span>
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

// ^ Composant principal => App | 
function App({ }) {
  return (
    <Container title="Gestionnaire de tâches">
      <Form />
      <Select />
      <List />
    </Container>);
}

export default App;
