import logo from './logo.svg';
import './App.css';
import Contribution from './Scripts/Contribution'
import InputAddList from './Scripts/Components/InputAddList'; 

//This header list is what is passed in by the parent (delete after)
const headers = {

  "NAME":{
      "type": "text", 
      "disp": "Name",  //How this variable would be displayed to the user.
      "id": "NAME", // ID has to match with key name.
      "readOnly": true,//If modifications can be made on input array
      "options": {
        "array":['Bosch', 'VCAA', 'Tutoring', 'Other'], //Must be here if readonly is true
        
      }
  }, 
  "AMOUNT":{
      "type": "number", 
      "disp": "Amount", 
      "id": "AMOUNT"
  }, 
  "DATE":{
      "type":"date", 
      "disp": "Date", 
      "id": "DATE"
  }
}

function App() {
  return (
    <div >
      <InputAddList headers={headers}/>
    </div>
  );
}

export default App;
