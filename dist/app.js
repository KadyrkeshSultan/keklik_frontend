!function(e){var t={};function n(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(r,s,function(t){return e[t]}.bind(null,s));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const r={};function s(){return r}class o{static hideAllPages(){let e=document.getElementsByClassName("page");for(let t=0;t<e.length;t++)e[t].hidden=!0}static showOnlyOnePage(e){o.hideAllPages(),document.querySelector("."+e).hidden=!1}}function a(...e){e.forEach(e=>{document.querySelector("#"+e.button).addEventListener("touchend",function(e){e.preventDefault(),e.target.click()},!1),document.querySelector("#"+e.button).addEventListener("click",()=>{o.showOnlyOnePage(e.nextPage),history.pushState({},"",e.pagePath)})})}class i{constructor(){i.pagePath(),i.pageBoxName(),this.addEventsOnButtons()}static pagePath(){}static pageBoxName(){}addEventsOnButtons(){}addRedirectOnButtons(...e){a(...e)}}const c={OK_MESSAGE:"ok",EMPTY_MESSAGE:"empty",INCORRECT_MESSAGE:"incorrect"};class u{static responseOk(){return c.OK_MESSAGE}static responseEmpty(){return c.EMPTY_MESSAGE}static responseIncorrect(){return c.INCORRECT_MESSAGE}static correctLogin(e){if(!e)return u.responseEmpty();return/^[\w\d]{3,10}$/.test(e)?u.responseOk():u.responseIncorrect()}static correctPassword(e){if(!e)return u.responseEmpty();return/\S{3,16}$/.test(e)?u.responseOk():u.responseIncorrect()}}const l={HTTP_OK:2,XHR_READY:4},d=!0;class g{constructor(){s().requester=this}static baseUrl(){return"https://keklik-api.herokuapp.com/"}static getToken(){return null!==localStorage.getItem("token")?localStorage.getItem("token"):"no"}static setToken(e){let t="Token "+e.token.toString();localStorage.setItem("token",t),console.log("TOKEN = "+localStorage.getItem("token"))}static setUser(e){localStorage.setItem("user",JSON.stringify(e)),console.log("USER = "+localStorage.getItem("user"))}static requestPost(e,t,n){const r=new XMLHttpRequest;r.open("POST",this.baseUrl()+e,!0),r.withCredentials=d;const s=JSON.stringify(t);r.setRequestHeader("Content-Type","application/json; charset=utf8"),r.setRequestHeader("Authorization",g.getToken()),r.send(s),r.onreadystatechange=function(){if(r.readyState!==l.XHR_READY)return;if(parseInt(+r.status/100)!==l.HTTP_OK)return n(r,null);const e=JSON.parse(r.responseText);g.setToken(e),g.setUser(e),n(null,e)}}static requestGet(e,t){const n=new XMLHttpRequest;n.open("GET",this.baseUrl()+e,!0),n.withCredentials=d,n.setRequestHeader("Authorization",g.getToken()),n.send(),n.onreadystatechange=function(){if(n.readyState!==l.XHR_READY)return;if(parseInt(+n.status/100)!==l.HTTP_OK)return t(n,null);const e=JSON.parse(n.responseText);t(null,e)}}static auth(e,t,n){const r={username:e,password:t};g.requestPost("api/session/",r,n)}static register(e,t,n){const r={username:e,password:t};g.requestPost("api/users/",r,n)}static whoami(e){g.requestGet("api/users/me/",e)}}var p={clearFields(...e){e.forEach(e=>{const t="#"+e;let n=document.querySelector(t);"INPUT"===n.nodeName?n.value="":"DIV"===n.nodeName&&(n.innerHTML="")})}};const m={EMPTY_MESSAGE:"Заполнены не все поля",INCORRECT_MESSAGE:"Использованы недопустимые символы",RESPONSE_MESSAGE:"Некорректный ввод или логин уже существует",SUCCESS_SIGN_UP_MESSAGE:"Вы успешо зарегистрировались!"};class E extends u{constructor(){super(),Object.assign(E.prototype,p),this.loginValue="",this.passwordValue="",this.errorBox=null,this.addEventsToButtons(),console.log("reg FORM")}static msgEmptyField(){return m.EMPTY_MESSAGE}static msgIncorrectInput(){return m.INCORRECT_MESSAGE}static msgResponseFromHost(){return m.RESPONSE_MESSAGE}static msgSignUpSuccess(){return m.SUCCESS_SIGN_UP_MESSAGE}static validate(e,t,n){let r=u.correctLogin(e),s=u.correctPassword(t);return r===u.responseEmpty()||s===u.responseEmpty()?(n.innerHTML=E.msgEmptyField(),!1):r===u.responseIncorrect()||s===u.responseIncorrect()?(n.innerHTML=E.msgIncorrectInput(),!1):(n.innerHTML="",!0)}clearForm(){this.clearFields("regform-login","regform-password","regform-err")}sendRequest(){g.register(this.loginValue,this.passwordValue,e=>{if(e)return this.errorBox.innerHTML=E.msgResponseFromHost();alert(E.msgSignUpSuccess()),this.clearForm(),s().officePage.render(),o.showOnlyOnePage("office-page")})}addEventsToButtons(){document.querySelector("#regformBtn").addEventListener("click",()=>{this.loginValue=document.querySelector("#regform-login").value,this.passwordValue=document.querySelector("#regform-password").value,this.errorBox=document.querySelector("#regform-err"),E.validate(this.loginValue,this.passwordValue,this.errorBox)&&this.sendRequest()})}}class h extends i{constructor(){super(),this.form=new E}static pagePath(){return"/register"}static pageBoxName(){return"register-page"}getForm(){return this.form}addEventsOnButtons(){}}const f={EMPTY_MESSAGE:"Заполнены не все поля",INCORRECT_MESSAGE:"Использованы недопустимые символы",RESPONSE_MESSAGE:"Некорректный ввод или логина не существует",SUCCESS_SIGN_IN_MESSAGE:"Вы вошли на сайт!"};class S extends u{constructor(){super(),Object.assign(S.prototype,p),this.loginValue="",this.passwordValue="",this.errorBox=null,this.addEventsToButtons(),console.log("log FORM")}static msgEmptyField(){return f.EMPTY_MESSAGE}static msgIncorrectInput(){return f.INCORRECT_MESSAGE}static msgResponseFromHost(){return f.RESPONSE_MESSAGE}static msgSignUpSuccess(){return f.SUCCESS_SIGN_IN_MESSAGE}static validate(e,t,n){let r=u.correctLogin(e),s=u.correctPassword(t);return r===u.responseEmpty()||s===u.responseEmpty()?(n.innerHTML=S.msgEmptyField(),!1):r===u.responseIncorrect()||s===u.responseIncorrect()?(n.innerHTML=S.msgIncorrectInput(),!1):(n.innerHTML="",!0)}clearForm(){this.clearFields("login-form-login","login-form-password","login-form-err")}sendRequest(){g.auth(this.loginValue,this.passwordValue,e=>{if(e)return this.errorBox.innerHTML=S.msgResponseFromHost();alert(S.msgSignUpSuccess()),this.clearForm(),s().officePage.render(),o.showOnlyOnePage("office-page")})}addEventsToButtons(){document.querySelector("#login-form-btn").addEventListener("click",()=>{this.loginValue=document.querySelector("#login-form-login").value,this.passwordValue=document.querySelector("#login-form-password").value,this.errorBox=document.querySelector("#login-form-err"),console.log("log BTN"),S.validate(this.loginValue,this.passwordValue,this.errorBox)&&this.sendRequest()})}}class y extends i{constructor(){super(),this.form=new S}static pagePath(){return"/login"}static pageBoxName(){return"login-page"}getForm(){return this.form}addEventsOnButtons(){}}class P extends i{constructor(){super(),this.addRedirectOnButtons({button:"course-card-1",nextPage:"course-page",pagePath:"/course"}),this.addEventsOnButtons(),console.log("office"),s().user={}}static pagePath(){return"/office"}static pageBoxName(){return"office-page"}render(){g.whoami((e,t)=>{if(e)return alert("office error");s().user=t,document.getElementById("office-header-username").innerHTML=s().user.username})}addEventsOnButtons(){document.getElementById("to-courses-btn").onclick=(()=>{console.log("C1"),document.getElementById("courses-desk").hidden=!1,document.getElementById("to-quizes-btn").classList.remove("active"),document.getElementById("quizes-desk").hidden=!0,document.getElementById("to-courses-btn").classList.add("active"),document.getElementById("profile").hidden=!0,document.getElementById("to-profile-btn").classList.remove("active")}),document.getElementById("to-quizes-btn").onclick=(()=>{console.log("C2"),document.getElementById("courses-desk").hidden=!0,document.getElementById("to-quizes-btn").classList.add("active"),document.getElementById("quizes-desk").hidden=!1,document.getElementById("to-courses-btn").classList.remove("active"),document.getElementById("profile").hidden=!0,document.getElementById("to-profile-btn").classList.remove("active")}),document.getElementById("to-profile-btn").onclick=(()=>{console.log("C3"),document.getElementById("courses-desk").hidden=!0,document.getElementById("to-quizes-btn").classList.remove("active"),document.getElementById("quizes-desk").hidden=!0,document.getElementById("to-courses-btn").classList.remove("active"),document.getElementById("profile").hidden=!1,document.getElementById("to-profile-btn").classList.add("active")})}}class O extends i{constructor(){super(),this.addEventsOnButtons(),this.addRedirectOnButtons({button:"group-card-1",nextPage:"group-page",pagePath:"/group"}),console.log("course")}static pagePath(){return"/course"}static pageBoxName(){return"course-page"}addEventsOnButtons(){}}class v extends i{constructor(){super(),this.addEventsOnButtons(),this.addRedirectOnButtons({button:"to-play-btn-1",nextPage:"play-page",pagePath:"/play"}),console.log("group")}static pagePath(){return"/group"}static pageBoxName(){return"group-page"}addEventsOnButtons(){}}class B{constructor(){this.addRedirectOnNavBtn({button:"nav-main-btn",nextPage:"main-page",pagePath:"/main"},{button:"nav-login-btn",nextPage:"register-page",pagePath:"/register"},{button:"nav-info-btn",nextPage:"info-page",pagePath:"/info"},{button:"nav-office-btn",nextPage:"office-page",pagePath:"/office"}),s().registerPage=new h,s().loginPage=new y,s().officePage=new P,s().coursePage=new O,s().groupPage=new v;h.pagePath();a({button:"regform-to-login-link",nextPage:"login-page",pagePath:"/login"},{button:"login-form-to-register-link",nextPage:"register-page",pagePath:"/register"}),B.redirect(),window.addEventListener("popstate",()=>{B.redirect()})}navigate(){}addRedirectOnNavBtn(...e){a(...e)}static redirect(){switch(window.location.pathname){case"/main":o.showOnlyOnePage("main-page");break;case"/office":o.showOnlyOnePage("office-page");break;case"/register":o.showOnlyOnePage("register-page");break;case"/login":o.showOnlyOnePage("login-page");break;case"/info":o.showOnlyOnePage("info-page");break;case"/course":o.showOnlyOnePage("course-page");break;case"/group":o.showOnlyOnePage("group-page");break;case"/play":o.showOnlyOnePage("play-page");break;case"/edit":o.showOnlyOnePage("edit-page");break;default:o.showOnlyOnePage("main-page")}}}window.addEventListener("load",function(){console.log("HELLO APP"),s().router=new B,s().router,document.querySelector(".main-box").hidden=!1})}]);