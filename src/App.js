import './App.css';
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



