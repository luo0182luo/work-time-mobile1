import Cookies from "js-cookie"
import {Base64} from "js-base64"

const qxManage = 'ding_qx_cookie';
const StandardKey = 'ding_standard_id';
const host_name = process.env.BASE_HOST_NAME;
const specialtyIdList = [1,2,3];


function getQxCookie(){
    let qxCookie = localStorage.getItem(qxManage);
    if (qxCookie) {
        return Base64.decode(qxCookie)
    } else {
        return null
    }
}

function setQxCookie(){
    return localStorage.setItem(qxManage,Base64.encode(obj));
    
}

function removeQxCookie(){
    return localStorage.removeItem(qxManage);
    
}


 /* 
 DING-Token
 獲取、設置、刪除
 
 */


function getStandardId(specialtyId){
    return Cookies.get(StandardKey + specialtyId)
    
}

function setStandardId(token,specialtyId){
    return Cookies.set(StandardKey + specialtyId,token)
    
}

function removeStandardId(){
    specialtyIdList.forEach((item)=>{
        Cookies.remove(StandardKey + item)
    })
    
}


export default {
    getQxCookie,
    setQxCookie,
    removeQxCookie,
    getStandardId,
    setStandardId,
    removeStandardId
}
// export function setCookie(name, value, hour) { //设置cookie
//   var d = new Date();
//   d.setTime(d.getTime() + (hour * 60 * 60 * 1000));
//   var expires = "expires=" + d.toUTCString();
//   document.cookie = name + "=" + value + "; " + expires;
// }
// export function getCookie(name) {
//   var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

//   if (arr = document.cookie.match(reg))

//     return unescape(arr[2]);
//   else
//     return null;
// }
