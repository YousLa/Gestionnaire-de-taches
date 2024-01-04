import { useAppContext } from '../context';

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

export default Select