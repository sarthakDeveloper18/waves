import axios from 'axios'
import { USER_SERVER, PRODUCT_SERVER } from "../components/utils/misc";
import {LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER, ADD_TO_CART, GET_CARD_ITEMS, REMOVE_FROM_CART, ON_SUCCESS_BUY, UPDATE_DATA, CLEAR_UPDATE_DATA} from './types';

export function loginUser(dataToSubmit){
    const response = axios.post(`${USER_SERVER}/login`, dataToSubmit)
    .then(response=> response.data)
    return{
        type: LOGIN_USER,
        payload: response
    }
}

export function registerUser(dataToSubmit){
    const response = axios.post(`${USER_SERVER}/register`, dataToSubmit)
    .then(response=> response.data)
    return{
        type: REGISTER_USER,
        payload: response
    }
}

export function auth(){
    const response = axios.get(`${USER_SERVER}/auth`)
    .then(response=> response.data)
    return{
        type: AUTH_USER,
        payload: response
    }
}

export function logout(){
    const response = axios.get(`${USER_SERVER}/logout`)
    .then(response=> response.data)
    return{
        type: LOGOUT_USER,
        payload: response
    }
}

export function addToCart(_id){
    const response = axios.post(`${USER_SERVER}/addToCart?id=${_id}`)
    .then(response=> response.data)
    return{
        type: ADD_TO_CART,
        payload: response
    }
}

export function removeFromCart(id){
    const response = axios.get(`${USER_SERVER}/removeFromCart?id=${id}`)
    .then(response=> {
        response.data.cart.forEach(item=>{
            response.data.cartDetail.forEach((detail, i)=>{
                if(item.id === detail._id){
                    response.data.cartDetail[i].quantity = item.quantity
                }
            })
        })
        return response.data
    })
    return{
        type: REMOVE_FROM_CART,
        payload: response
    }
}

export function getCardItems(cartItems, userCart){
    const response = axios.get(`${PRODUCT_SERVER}/get_articles_by_id?id=${cartItems}&type=array`)
    .then(response=> {
        userCart.forEach(item => {
            response.data.forEach((data, i)=>{
                if(item.id === data._id){
                    response.data[i].quantity = item.quantity
                }
            })
        })
        return response.data
    })

    return{
        type: GET_CARD_ITEMS,
        payload: response
    }
}

export function onSuccessBuy(data){
    const response = axios.post(`${USER_SERVER}/successBuy`, data).then(response=> response.data)
    return{
        type: ON_SUCCESS_BUY,
        payload: response
    }
}

export function updateData(data){
    const response = axios.post(`${USER_SERVER}/updateProfile`, data).then(response=> response.data)
    return{
        type: UPDATE_DATA,
        payload: response
    }
}

export function clearUpdateData(data){
    return{
        type: CLEAR_UPDATE_DATA,
        payload: ''
    }
}