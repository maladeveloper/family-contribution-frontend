import './App.css';
import LoginPage from './Scripts/LoginPage'
import { Provider } from 'react-redux'; 
import store from './Scripts/Redux/Store';
import {BASE_URL} from "./Scripts/DynBackendInterface";

console.log(BASE_URL)


function App() {
  return (
    <div >
      <Provider store={store}>
        <LoginPage/>
      </Provider>

    </div>
  );
}

export default App;



