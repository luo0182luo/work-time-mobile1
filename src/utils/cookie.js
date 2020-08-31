export function setCookie(name, value, hour) { //设置cookie
  var d = new Date();
  d.setTime(d.getTime() + (hour *  60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + "; " + expires;
 }
 export function getCookie(name)
 {
     var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  
     if(arr=document.cookie.match(reg))
  
         return unescape(arr[2]);
     else
         return null;
 }