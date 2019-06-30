import { combineReducers } from 'redux';
import axios from 'axios';

const init = {
    id: '',
    username: '',
    myCart: []
}

const authReducer = (state = init, action) => {

    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username
            }

        case "LOGOUT_SUCCESS":
            return {
                ...state,
                id: '',
                username:''
            }

        case "ADD_TO_CART":
            return{
                ...state,
                myCart: action.payload.myCart
            }
    
        default:
            return state
    }

    // if (action.type == 'LOGIN_SUCCESS') {
    //     return {
    //         ...state,    //spread operator
    //         id : action.payload.id,
    //         username : action.payload.username
    //     }
    // }

    // return state;
}



export default combineReducers({
    auth: authReducer   //pertama kali -> auth : {id:'', username: ''}
})