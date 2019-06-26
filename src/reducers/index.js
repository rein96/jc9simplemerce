import { combineReducers } from 'redux';

const init = {
    id: '',
    username: '',
    message: ''
}

const authReducer = (data = init, action) => {

    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...data,
                id: action.payload.id,
                username: action.payload.username
            }

        case "LOGOUT_SUCCESS":
            return{
                ...data,
                id: '',
                username:''
            }
    
        default:
            return data
    }

    // if (action.type == 'LOGIN_SUCCESS') {
    //     return {
    //         ...data,    //spread operator
    //         id : action.payload.id,
    //         username : action.payload.username
    //     }
    // }

    // return data;
}


export default combineReducers({
    auth: authReducer   //pertama kali -> auth : {id:'', username: ''}
})