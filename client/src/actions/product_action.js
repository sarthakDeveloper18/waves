import axios from 'axios';
import { PRODUCT_SERVER } from "../components/utils/misc";
import {PRODUCTS_ARRIVAL, PRODUCTS_SELL, GET_WOODS, ADD_WOOD, GET_BRANDS, ADD_BRAND, GET_PRODUCTS_TO_SHOP, ADD_PRODUCT, CLEAR_PRODUCT, CLEAR_PRODUCT_DETAIL, GET_PRODUCT_DETAIL} from './types';

export function getProductsByArrival(){
    const response = axios.get(`${PRODUCT_SERVER}/get_article_by_sold?sort=createdAt&order=desc&limit=4`)
    .then(response=> response.data)
    return{
        type: PRODUCTS_ARRIVAL,
        payload: response
    }
}

export function getProductsBySell(){
    const response = axios.get(`${PRODUCT_SERVER}/get_article_by_sold?sort=sold&order=desc&limit=4`)
    .then(response=> response.data)
    return{
        type: PRODUCTS_SELL,
        payload: response
    }
}

export function getBrands(){
    const response = axios.get(`${PRODUCT_SERVER}/getBrands`)
    .then(response=> response.data)
    return{
        type: GET_BRANDS,
        payload: response
    }
}

export function getWoods(){
    const response = axios.get(`${PRODUCT_SERVER}/getWoods`)
    .then(response=> response.data)
    return{
        type: GET_WOODS,
        payload: response
    }
}

export function getProductsToShop(skip, limit, filters = [], prevState = []){
    const data = {
        skip, 
        limit, 
        filters
    }
    const response = axios.post(`${PRODUCT_SERVER}/shop`, data)
    .then(response=> {
        let newState = [...prevState, ...response.data.articles]
        return{
            size: response.data.size,
            articles: newState      
        }
    })
    return{
        type: GET_PRODUCTS_TO_SHOP,
        payload: response
    }
}

export function addProduct(dataToSubmit){
    const response = axios.post(`${PRODUCT_SERVER}/article`, dataToSubmit)
    .then(response=> response.data)
    return{
        type: ADD_PRODUCT,
        payload: response
    }
}

export function clearProduct(){
    return{
        type: CLEAR_PRODUCT,
        payload: ''
    }
}

export function addBrand(dataToSubmit, existingBrands){
    const response = axios.post(`${PRODUCT_SERVER}/brand`, dataToSubmit)
    .then(response=> {
        let brand = [...existingBrands, response.data.brand]
        return{
            success: response.data.success,
            brands: brand
        }
    })
    return{
        type: ADD_BRAND,
        payload: response
    }
}

export function addWood(dataToSubmit, existingWoods){
    const response = axios.post(`${PRODUCT_SERVER}/wood`, dataToSubmit)
    .then(response=> {
        let wood = [...existingWoods, response.data.wood]
        return{
            success: response.data.success,
            woods: wood
        }
    })
    return{
        type: ADD_WOOD,
        payload: response
    }
}

export function getProductDetail(id){
    const response = axios.get(`${PRODUCT_SERVER}/get_articles_by_id?id=${id}&type=single`).then(response=> response.data[0])
    return{
        type: GET_PRODUCT_DETAIL,
        payload: response
    }
}

export function clearProductDetail(id){
    return{
        type: CLEAR_PRODUCT_DETAIL,
        payload: ''
    }
}