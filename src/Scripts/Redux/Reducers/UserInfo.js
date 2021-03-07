import{UPDATE_USER_ID, UPDATE_USER_INFO} from '../ActionTypes'

export const initialStoreState = {
    userId:null,
    userInfo: null
  }
  
  
export const userInfoReducer = (state = initialStoreState, action)=>{
  
    switch(action.type){
  
        case 'UPDATE_USER_ID':

        return{

            ...state, 
            userId: action.userId
        }
    
        case 'UPDATE_USER_INFO':

            return{

                ...state,
                userInfo: action.userInfo
            }
    
    
    }
  }