import logo from './logo.svg';
import './App.css';
import Contribution from './Scripts/Contribution'
import InputAddList from './Scripts/Components/InputAddList'; 
import LoginPage from './Scripts/LoginPage'
import { Provider } from 'react-redux'; 
import store from './Scripts/Redux/Store';

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



