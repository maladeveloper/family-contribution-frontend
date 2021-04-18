import socketClient  from "socket.io-client";
export const BASE_URL = 'https://fam-cont-dyn-backend.herokuapp.com/'
//export const BASE_URL = "http://127.0.0.1:3001/"
export var socket = socketClient(BASE_URL);

//Events
export var INCOME_UPDATE = "incomeUpdate" 

