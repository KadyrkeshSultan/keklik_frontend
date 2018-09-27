!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const r={};function o(){return r}class s{static hideAllPages(){let e=document.getElementsByClassName("page");for(let t=0;t<e.length;t++)e[t].hidden=!0}static showOnlyOnePage(e){s.hideAllPages(),document.querySelector("."+e).hidden=!1}}function a(...e){e.forEach(e=>{document.querySelector("#"+e.button).addEventListener("touchend",function(e){e.preventDefault(),e.target.click()},!1),document.querySelector("#"+e.button).addEventListener("click",()=>{s.showOnlyOnePage(e.nextPage),history.pushState({},"",e.pagePath)})})}class c{constructor(){c.pagePath(),c.pageBoxName(),this.addEventsOnButtons()}static pagePath(){}static pageBoxName(){}addEventsOnButtons(){}addRedirectOnButtons(...e){a(...e)}}const i={OK_MESSAGE:"ok",EMPTY_MESSAGE:"empty",INCORRECT_MESSAGE:"incorrect"};class u{static responseOk(){return i.OK_MESSAGE}static responseEmpty(){return i.EMPTY_MESSAGE}static responseIncorrect(){return i.INCORRECT_MESSAGE}static correctLogin(e){if(!e)return u.responseEmpty();return/^[\w\d]{3,10}$/.test(e)?u.responseOk():u.responseIncorrect()}static correctPassword(e){if(!e)return u.responseEmpty();return/\S{3,16}$/.test(e)?u.responseOk():u.responseIncorrect()}}const d={EMPTY_MESSAGE:"Заполнены не все поля",INCORRECT_MESSAGE:"Использованы недопустимые символы",RESPONSE_MESSAGE:"Некорректный ввод или логин уже существует",SUCCESS_SIGN_UP_MESSAGE:"Вы успешо зарегистрировались!"};class g extends u{constructor(){super(),this.loginValue="",this.passwordValue="",this.errorBox=null,this.addEventsToButtons()}static msgEmptyField(){return d.EMPTY_MESSAGE}static msgIncorrectInput(){return d.INCORRECT_MESSAGE}static msgResponseFromHost(){return d.RESPONSE_MESSAGE}static msgSignUpSuccess(){return d.SUCCESS_SIGN_UP_MESSAGE}static validate(e,t,n){let r=u.correctLogin(e),o=u.correctPassword(t);return r===u.responseEmpty()||o===u.responseEmpty()?(n.innerHTML=g.msgEmptyField(),!1):r===u.responseIncorrect()||o===u.responseIncorrect()?(n.innerHTML=g.msgIncorrectInput(),!1):(n.innerHTML="",!0)}sendRequest(){o.requester(this.loginValue,this.passwordValue,e=>{if(e)return this.errorBox.innerHTML=g.msgResponseFromHost();alert(g.msgSignUpSuccess()),document.querySelector(".register-page__button-back").click()})}addEventsToButtons(){document.querySelector("#regformBtn").addEventListener("click",()=>{this.loginValue=document.querySelector("#regform-login").value,this.passwordValue=document.querySelector("#regform-password").value,this.errorBox=document.querySelector("#regform-err"),g.validate(this.loginValue,this.passwordValue,this.errorBox)&&this.sendRequest()})}}class l extends c{constructor(){super(),this.form=new g}static pagePath(){return"/register"}static pageBoxName(){return"register-page"}getForm(){return this.form}addEventsOnButtons(){}}class p extends c{constructor(){super(),this.addRedirectOnButtons({button:"course-card-1",nextPage:"course-page",pagePath:"/course"}),this.addEventsOnButtons(),console.log("office")}static pagePath(){return"/office"}static pageBoxName(){return"office-page"}getForm(){return this.form}addEventsOnButtons(){document.getElementById("to-courses-btn").onclick=(()=>{console.log("C1"),document.getElementById("courses-desk").hidden=!1,document.getElementById("to-quizes-btn").classList.remove("active"),document.getElementById("quizes-desk").hidden=!0,document.getElementById("to-courses-btn").classList.add("active")}),document.getElementById("to-quizes-btn").onclick=(()=>{console.log("C2"),document.getElementById("courses-desk").hidden=!0,document.getElementById("to-quizes-btn").classList.add("active"),document.getElementById("quizes-desk").hidden=!1,document.getElementById("to-courses-btn").classList.remove("active")})}}class m extends c{constructor(){super(),this.addEventsOnButtons(),this.addRedirectOnButtons({button:"group-card-1",nextPage:"group-page",pagePath:"/group"}),console.log("course")}static pagePath(){return"/course"}static pageBoxName(){return"course-page"}getForm(){return this.form}addEventsOnButtons(){}}class E{constructor(){this.addRedirectOnNavBtn({button:"nav-main-btn",nextPage:"main-page",pagePath:"/main"},{button:"nav-login-btn",nextPage:"register-page",pagePath:"/register"},{button:"nav-info-btn",nextPage:"info-page",pagePath:"/info"},{button:"nav-office-btn",nextPage:"office-page",pagePath:"/office"}),o().registerPage=new l,o().officePage=new p,o().coursePage=new m;l.pagePath();o().registerPage.addRedirectOnButtons({button:"regformBtn",nextPage:"login-page",pagePath:"/main"}),E.redirect(),window.addEventListener("popstate",()=>{E.redirect()})}navigate(){}addRedirectOnNavBtn(...e){a(...e)}static redirect(){switch(window.location.pathname){case"/main":s.showOnlyOnePage("main-page");break;case"/office":s.showOnlyOnePage("office-page");break;case"/register":s.showOnlyOnePage("register-page");break;case"/info":s.showOnlyOnePage("info-page");break;case"/course":s.showOnlyOnePage("course-page");break;case"/group":s.showOnlyOnePage("group-page");break;default:s.showOnlyOnePage("main-page")}}}window.addEventListener("load",function(){console.log("HELLO APP"),o().router=new E,o().router,document.querySelector(".main-box").hidden=!1})}]);