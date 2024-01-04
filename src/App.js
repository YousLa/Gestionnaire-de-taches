// ^ useState : Hook pour gérer les états dans le composants fonctionnels.
// ^ usemMemo : Hook pour mémoriser la valeur calculée entre les rendus.
// ^ useRef : Hook pour créer une référence mutable qui persiste à travers les rendus.
// ^ forwardRed : Fonction pour transférer les références aux composants enfants.
// ^ useReducer : Hook pour gérer les états avec des actions et un reducer.
// ^uuid : Bibliothèque pour générer des identifiants uniques.
import Select from "./components/Select";
import Form from "./components/Form";
import List from "./components/List";
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
