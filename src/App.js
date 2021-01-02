import logo from './logo.svg';
import './App.css';
import Contribution from './Scripts/Contribution'
import InputAddList from './Scripts/Components/InputAddList'; 
import LoginPage from './Scripts/LoginPage'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

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


const initialStoreState = {
  userInfo: null
}


//Define the action of updating the user id 
const UPDATEUSER = (newUserInfo) => {
  return{
  type:'UPDATE_USER',
  userInfo: newUserInfo
  }
}; 

//Define a selector that can get user data 
const selectUserData = state => state.userInfo

const reducer = (state = initialStoreState, action)=>{

  switch(action.type){

    case 'UPDATE_USER':

      return{

        ...state, 
        userInfo: action.userInfo
      }
  }
}

const store = createStore(reducer)

console.log(store.getState())

//Do an action to update the user 
store.dispatch(UPDATEUSER("MAL001"))

console.log(selectUserData(store.getState()))

//Do an action to update the user 
store.dispatch(UPDATEUSER("ANU001"))
console.log(store.getState())

