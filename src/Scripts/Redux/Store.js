import { createStore } from "redux";
import {userInfoReducer} from "./Reducers/UserInfo";

export default createStore(userInfoReducer);