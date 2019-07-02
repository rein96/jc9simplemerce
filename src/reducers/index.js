import { combineReducers } from 'redux';

const init = {
    id: '',
    username: '',
    myCart: [],     // Array [ {}, {}, {} ]
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
            let moreThanOne = state.myCart.find( el => el.id === action.payload.lastSelectedID );
            console.log('%c moreThanOne', 'color:orange; font-weight:bold;');
            console.log(moreThanOne);

            if(moreThanOne) {
                
                var addedItemQuantity = action.payload.singleItemToCart.quantity
                for(var i = 0; i<state.myCart.length; i++){
                    if(state.myCart[i].id === action.payload.lastSelectedID){
                        state.myCart[i].quantity = state.myCart[i].quantity + addedItemQuantity
                    }
                }

               return {
                   ...state,
                   totalUnit : state.totalUnit + addedItemQuantity,
                   totalPrice: state.totalPrice + parseInt(moreThanOne.price),
               }
            } else {

                return{
                    ...state,
                    myCart: [...state.myCart, action.payload.singleItemToCart],
                    totalPrice: state.totalPrice + action.payload.totalPrice,
                    totalUnit : state.totalUnit + action.payload.singleItemToCart.quantity
                }

            }

           
    
        default:
            return state
    }
}


export default combineReducers({
    auth: authReducer   //pertama kali -> auth : {id:'', username: ''}
})