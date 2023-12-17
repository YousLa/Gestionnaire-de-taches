import { useState, useMemo, useRef, forwardRef, useReducer } from "react";
import { v4 as uuid } from "uuid";
import './App.css';

const initialState = {
  items: [{ idI: 1, contentI: "pay bills", doneI: true }, { idI: 2, contentI: "learn React", doneI: false }],
  all: [{ idI: 1, contentI: "pay bills", doneI: true }, { idI: 2, contentI: "learn React", doneI: false }],
  input: null
}


function reducer(state, action) {
  switch (action.type) {
    case 'submit':
      return {
        ...state,
        items: [...state.items, action.payload.item],
        all: [...state.items, action.payload.item]
      }
    case 'change':
      return {
        ...state,
        input: action.payload.value
      }
    case 'check':
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

const Form = forwardRef(({ onChangeF, onSubmitF }, ref) => {
  return (

    <form className="input-group mb-3" onSubmit={onSubmitF}>
      <input
        ref={ref}
        type="text"
        className="form-control form-control-lg mx-0"
        placeholder="Add new..."
        style={{ height: "max-content" }}
        onChange={onChangeF} />
      <button type="submit" className="btn btn-info">Add</button>
    </form>
  )
})

function Select({ onSelectS }) {
  const options = ["All", "Completed"];

  const select = e => onSelectS(e.target.value);
  return (
    <div className="d-flex justify-content-end align-items-center my-3 ">
      <select onChange={select} className="select form-select form-control form-control-sm">
        {options.map(option => <option value={option}>{option}</option>)}
      </select>
    </div>
  )
}

// fonction onCheck utilisé ici en prop onCheckI => error
function Item({ idI, contentI, doneI, onCheck }) {
  const toggleCheck = e => onCheck(idI, e.target.checked)
  const isDone = doneI ? "mmx-3 item-done" : "mx-3";
  return (
    <li className="list-group-item">
      <input className="form-check-input" type="checkbox" aria-label="..." checked={doneI} onChange={toggleCheck} />
      <span className={isDone}>{contentI}</span>
    </li>
  )
}

function List({ itemsL, onCheckL }) {
  return (
    <ul className="list-group">
      {itemsL.map(item => <Item key={item.idI} {...item} onCheck={onCheckL} />)}
    </ul>
  )
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const ref = useRef();

  const handleOnChange = e => dispatch({ type: "change", payload: { value: e.target.value } });
  const handleOnSubmit = e => {
    e.preventDefault();
    if (isValid) {
      dispatch({ type: "submit", payload: { item: { idI: uuid(), contentI: state.input, doneI: false } } });
      ref.current.value = null;
    }
  }

  const handleOnCheck = (idH, boolH) => {
    dispatch({ type: "check", payload: { idH, boolH } })
  }

  const handleOnSelect = option => {
    dispatch({ type: "select", payload: { option } })
  }

  const isValid = useMemo(() => !!state.input, [state.input]);

  return (
    <Container title="Gestionnaire de tâches">

      <Form ref={ref} onChangeF={handleOnChange} onSubmitF={handleOnSubmit} />
      <Select onSelectS={handleOnSelect} />
      <List itemsL={state.items} onCheckL={handleOnCheck} />


    </Container>);
}

export default App;
