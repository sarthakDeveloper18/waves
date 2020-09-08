import {LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER, ADD_TO_CART, REMOVE_FROM_CART, GET_CARD_ITEMS, ON_SUCCESS_BUY, UPDATE_DATA, CLEAR_UPDATE_DATA} from '../actions/types'

export default function(state = {}, action){
    switch(action.type){
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
        case REGISTER_USER:
            return {...state, registerSuccess: action.payload}
        case AUTH_USER:
            return {...state, userData: action.payload}
        case LOGOUT_USER:
            return {...state}
        case ADD_TO_CART:
            return {...state, userData: {...state.userData, cart: action.payload}}
        case REMOVE_FROM_CART: 
            return {...state, cartDetail: action.payload.cartDetail, userData: {...state.userData, cart: action.payload.cart}}
        case GET_CARD_ITEMS:
            return {...state, cartDetail: action.payload}
        case ON_SUCCESS_BUY: 
            return {...state, onSuccess: action.payload.success, userData: {...state.userData, cart: action.payload.cart}, cartDetail: action.payload.cartDetail}
        case UPDATE_DATA:
            return {...state, updateUser: action.payload}
        case CLEAR_UPDATE_DATA: 
            return {...state, updateUser: action.payload}
        default:
            return state
    }
}