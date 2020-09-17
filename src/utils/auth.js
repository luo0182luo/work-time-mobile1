import Cookies from "js-cookie"


const TokenKey = 'DING-Token';
const host_name = process.env.BASE_HOST_HAME;


export function getToken(){
    return Cookies.get(TokenKey)
}

export function setToken(){
    if (host_name == 'loscalhost') {
        return Cookies.set(TokenKey,token)
    } else {
        return Cookies.set(TokenKey, token, {domain: host_name, path: '/'})
    }
}

export function removeToken(){
    if (host_name == 'loscalhost') {
        return Cookies.remove(TokenKey);
    } else {
        return Cookies.remove(TokenKey,  {domain: host_name});
    }
}