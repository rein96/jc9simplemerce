import { combineReducers } from 'redux';

const init = {
    id: '',
    username: '',
    myCart: [],
    totalPrice: 0,
    totalUnit : 0
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
                myCart: [...state.myCart, action.payload.myCart],
                totalPrice: state.totalPrice + action.payload.totalPrice,
                totalUnit : state.totalUnit + action.payload.myCart.quantity
            }
    
        default:
            return state
    }
}


export default combineReducers({
    auth: authReducer   //pertama kali -> auth : {id:'', username: ''}
})