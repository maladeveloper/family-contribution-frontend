import logo from './logo.svg';
import './App.css';
import Contribution from './Scripts/Contribution'
import InputAddList from './Scripts/Components/InputAddList'; 

//This header list is what is passed in by the parent (delete after)
const headers = ["DATE","NAME", "NUMBER", "NAME"]

function App() {
  return (
    <div >
      <InputAddList headers={headers}/>
    </div>
  );
}

export default App;
