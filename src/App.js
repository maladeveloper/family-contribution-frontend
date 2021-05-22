import './App.css';
import LoginParentPage from './Scripts/LoginParentPage'
import Homepage from './Scripts/Homepage';
import { Provider } from 'react-redux'; 
import store from './Scripts/Redux/Store';
import {BASE_URL} from "./Scripts/DynBackendInterface";

console.log(BASE_URL)


function App() {
  return (
    <div >
      <Provider store={store}>
        <LoginParentPage/>
      </Provider>

    </div>
  );
}

export default App;



