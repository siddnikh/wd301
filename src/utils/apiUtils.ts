import { PaginationParams } from "../types/common";
import { Form } from "../types/formTypes";
import { checkLogin } from "./loginUtils";


type requests = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
const API_BASE_URL = 'https://tsapi.coronasafe.live/api/'

export const request = async (endpoint: string, method: requests = 'GET', data: any = {}) => {

    let url;
    let payload: string;
    if(method === 'GET'){
        const requestParams = data ? 
        `${Object.keys(data).map(key => `${key}=${data[key]}`).join('&')}` : ""
        url = `${API_BASE_URL}${endpoint}?${requestParams}`;
        payload = "";
    } else {
        url = `${API_BASE_URL}${endpoint}`;
        payload = data ? JSON.stringify(data) : "";
    }

    const auth = checkLogin() ? `Token ${localStorage.getItem("authToken")}` : `Basic ${window.btoa("nono123:yesYES123")}`;

    const response = await fetch(
        url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: auth
            },
            body: (method !== 'GET') ? payload : null
        });

    if(response.ok){
        const json = await response.json();
        return json;
    } else {
        const errorJSON = await response.json();
        throw Error(errorJSON);
    }
}

export const createForm = (form: Form) => {
    return request('forms/', 'POST', form);
}

export const login = (username: string, password: string) => {
    return request('auth-token/', 'POST', {username, password});
}

export const listForms = (pageParams: PaginationParams) => {
    return request('forms/', 'GET', pageParams);
}