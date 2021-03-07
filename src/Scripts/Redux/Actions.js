import {UPDATE_USER_ID, UPDATE_USER_INFO } from './ActionTypes'; 

//Define the action of updating the user id 
export const UPDATEUSERID = (newUserId) => {
    return{
    type:UPDATE_USER_ID,
    userId: newUserId
    }
  }; 

  //Define the action of updating the user id 
export const UPDATEUSERINFO = (newUserInfo) => {
    return{
    type:UPDATE_USER_INFO,
    userInfo: newUserInfo
    }
  }; 