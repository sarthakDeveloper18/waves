import axios from 'axios';
import { SITE_SERVER } from "../components/utils/misc";
import { GET_SITE_DATA, UPDATE_SITE_DATA } from './types';

export function getSiteData(){
    const response = axios.get(`${SITE_SERVER}/site_data`).then(response=> response.data)
    return{
        type: GET_SITE_DATA,
        payload: response
    }
}

export function updateSiteData(data){
    const response = axios.post(`${SITE_SERVER}/site_data`, data).then(response=> response.data)
    return{
        type: UPDATE_SITE_DATA,
        payload: response
    }
}