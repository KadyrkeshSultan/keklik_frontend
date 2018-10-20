!function(e){var t={};function n(s){if(t[s])return t[s].exports;var i=t[s]={i:s,l:!1,exports:{}};return e[s].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(s,i,function(t){return e[t]}.bind(null,i));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const s={};function i(){return s}class o{static hideAllPages(){let e=document.getElementsByClassName("page");for(let t=0;t<e.length;t++)e[t].hidden=!0}static showOnlyOnePage(e){o.hideAllPages(),document.querySelector("."+e).hidden=!1}}function a(...e){e.forEach(e=>{document.querySelector("#"+e.button).addEventListener("touchend",function(e){e.preventDefault(),e.target.click()},!1),document.querySelector("#"+e.button).addEventListener("click",()=>{o.showOnlyOnePage(e.nextPage),history.pushState({},"",e.pagePath)})})}class r{constructor(){r.pagePath(),r.pageBoxName(),this.addEventsOnButtons()}static pagePath(){}static pageBoxName(){}addEventsOnButtons(){}addRedirectOnButtons(...e){a(...e)}}const d={OK_MESSAGE:"ok",EMPTY_MESSAGE:"empty",INCORRECT_MESSAGE:"incorrect"};class l{static responseOk(){return d.OK_MESSAGE}static responseEmpty(){return d.EMPTY_MESSAGE}static responseIncorrect(){return d.INCORRECT_MESSAGE}static correctLogin(e){if(!e)return l.responseEmpty();return/^[\w\d]{3,10}$/.test(e)?l.responseOk():l.responseIncorrect()}static correctPassword(e){if(!e)return l.responseEmpty();return/\S{3,16}$/.test(e)?l.responseOk():l.responseIncorrect()}static correctQuiz(e){console.log(e);let t=[];return""===e.title&&t.push("title_empty"),""===e.description&&t.push("description_empty"),""===e.tags&&t.push("tags_empty"),e.questions.forEach((e,n)=>{""===e.question&&t.push(n+"_question_empty"),"NaN"===e.answer.toString()&&t.push(n+"_answer_empty"),"NaN"===e.points.toString&&t.push(n+"_points_empty"),e.variants.filter(e=>""!==e)<2&&t.push(n+"_variants_empty")}),t}}const c={HTTP_OK:2,XHR_READY:4},u=!0;class p{static baseUrl(){return"http://46.229.213.75:8000/"}static requestToHost(e="GET",t,n=null,s){const o=new XMLHttpRequest;o.open(e,this.baseUrl()+t,!0),o.withCredentials=u;const a=JSON.stringify(n);o.setRequestHeader("Content-Type","application/json; charset=utf8"),o.setRequestHeader("Authorization",i().authWorker.getToken()),"GET"===e?o.send(null):o.send(a),o.onreadystatechange=function(){if(o.readyState!==c.XHR_READY)return;if(parseInt(+o.status/100)!==c.HTTP_OK)return"Invalid token."===JSON.parse(o.responseText).message&&i().authWorker.deleteToken(),s(o,null);const e=JSON.parse(o.responseText);s(null,e)}}static auth(e,t,n){const s={username:e,password:t};p.requestToHost("POST","api/session/",s,n)}static register(e,t,n){const s={username:e,password:t};p.requestToHost("POST","api/users/",s,n)}static whoami(e){p.requestToHost("GET","api/users/me/",null,e)}static quizNew(e,t){p.requestToHost("POST","api/quizzes/",e,t)}static quizEdit(e,t,n){console.log("id = "+e),p.requestToHost("PUT",`api/quizzes/${e}/`,t,n)}static quizzesOfUser(e){p.requestToHost("GET","api/quizzes/",null,e)}static changeUserData(e,t,n){const s={last_name:e,email:t};p.requestToHost("PATCH","api/users/me/",s,n)}static changePassword(e,t,n){const s={old_password:e,new_password:t};p.requestToHost("POST","api/users/me/password/",s,n)}static getQuizById(e,t){p.requestToHost("GET",`api/quizzes/${e}/`,null,t)}static createGame(e,t="",n){const s={quiz:e,label:t,online:!0};p.requestToHost("POST","api/games/",s,n)}}var g={clearFields(...e){e.forEach(e=>{const t="#"+e;let n=document.querySelector(t);"INPUT"===n.nodeName?n.value="":"DIV"===n.nodeName&&(n.innerHTML="")})}};const m={EMPTY_MESSAGE:"Заполнены не все поля",INCORRECT_MESSAGE:"Использованы недопустимые символы",RESPONSE_MESSAGE:"Некорректный ввод или логин уже существует",SUCCESS_SIGN_UP_MESSAGE:"Вы успешо зарегистрировались!"};class E extends l{constructor(){super(),Object.assign(E.prototype,g),this.loginValue="",this.passwordValue="",this.errorBox=null,this.addEventsToButtons(),console.log("reg FORM")}static msgEmptyField(){return m.EMPTY_MESSAGE}static msgIncorrectInput(){return m.INCORRECT_MESSAGE}static msgResponseFromHost(){return m.RESPONSE_MESSAGE}static msgSignUpSuccess(){return m.SUCCESS_SIGN_UP_MESSAGE}static validate(e,t,n){let s=l.correctLogin(e),i=l.correctPassword(t);return s===l.responseEmpty()||i===l.responseEmpty()?(n.innerHTML=E.msgEmptyField(),!1):s===l.responseIncorrect()||i===l.responseIncorrect()?(n.innerHTML=E.msgIncorrectInput(),!1):(n.innerHTML="",!0)}clearForm(){this.clearFields("regform-login","regform-password","regform-err")}sendRequest(){p.register(this.loginValue,this.passwordValue,(e,t)=>{if(e)return this.errorBox.innerHTML=E.msgResponseFromHost();i().authWorker.autharization(t),alert(E.msgSignUpSuccess()),this.clearForm(),i().officePage.render(),o.showOnlyOnePage("office-page")})}addEventsToButtons(){document.querySelector("#regformBtn").addEventListener("click",()=>{this.loginValue=document.querySelector("#regform-login").value,this.passwordValue=document.querySelector("#regform-password").value,this.errorBox=document.querySelector("#regform-err"),E.validate(this.loginValue,this.passwordValue,this.errorBox)&&this.sendRequest()})}}class h extends r{constructor(){super(),this.form=new E}static pagePath(){return"/register"}static pageBoxName(){return"register-page"}getForm(){return this.form}addEventsOnButtons(){}}const v={EMPTY_MESSAGE:"Заполнены не все поля",INCORRECT_MESSAGE:"Использованы недопустимые символы",RESPONSE_MESSAGE:"Некорректный ввод или логина не существует",SUCCESS_SIGN_IN_MESSAGE:"Вы вошли на сайт!"};class y extends l{constructor(){super(),Object.assign(y.prototype,g),this.loginValue="",this.passwordValue="",this.errorBox=null,this.addEventsToButtons(),console.log("log FORM")}static msgEmptyField(){return v.EMPTY_MESSAGE}static msgIncorrectInput(){return v.INCORRECT_MESSAGE}static msgResponseFromHost(){return v.RESPONSE_MESSAGE}static msgSignUpSuccess(){return v.SUCCESS_SIGN_IN_MESSAGE}static validate(e,t,n){let s=l.correctLogin(e),i=l.correctPassword(t);return s===l.responseEmpty()||i===l.responseEmpty()?(n.innerHTML=y.msgEmptyField(),!1):s===l.responseIncorrect()||i===l.responseIncorrect()?(n.innerHTML=y.msgIncorrectInput(),!1):(n.innerHTML="",!0)}clearForm(){this.clearFields("login-form-login","login-form-password","login-form-err")}sendRequest(){p.auth(this.loginValue,this.passwordValue,(e,t)=>{if(e)return this.errorBox.innerHTML=y.msgResponseFromHost();i().authWorker.autharization(t),alert(y.msgSignUpSuccess()),this.clearForm(),i().officePage.render(),o.showOnlyOnePage("office-page")})}addEventsToButtons(){document.querySelector("#login-form-btn").addEventListener("click",()=>{this.loginValue=document.querySelector("#login-form-login").value,this.passwordValue=document.querySelector("#login-form-password").value,this.errorBox=document.querySelector("#login-form-err"),console.log("log BTN"),y.validate(this.loginValue,this.passwordValue,this.errorBox)&&this.sendRequest()})}}class _ extends r{constructor(){super(),this.form=new y}static pagePath(){return"/login"}static pageBoxName(){return"login-page"}getForm(){return this.form}addEventsOnButtons(){}}function f(e,t){return`<img class="card-img-top" src="img/quiz_logo.png" alt="Card image cap">\n            <div class="card-body">\n            <h5 class="card-title">${e}</h5>\n            <p class="card-text">${t}</p>\n        </div>\n        <div class="card-footer">\n            <small class="text-muted">Последний запуск 3/9/2017</small>\n        </div>`}class b extends r{static newQuizCard(){return'<div id="card-row-1" class="card-deck">\n                                <div id="new-quiz" class="card new-quiz">\n                                    <img class="card-img-top" src="img/add_quiz.png" alt="Card image cap">\n                                    <div class="card-body text-white">\n                                        <h5 class="card-title">Новая викторина</h5>\n                                        <hr>\n                                        <p class="card-text">Создание нового набора вопросов</p>\n                                    </div>\n                                </div>'}static redirectToQuiz(e){console.log(e),p.getQuizById(e,(t,n)=>{t?console.log(t):(console.log("quiz "+e+" rendering"),i().quizEditorPage.render(e,n))})}static render(){let e=document.getElementById("quizzes-desk");e.innerHTML="",e.innerHTML=b.newQuizCard(),a({button:"new-quiz",nextPage:"edit-page",pagePath:"/edit"}),document.getElementById("new-quiz").addEventListener("click",()=>{i().quizEditorPage.clearForm()}),console.log("Quiz Desk"),b.quizzesReq(t=>{console.log(t);let n=1,s=1;for(let i=0;i<t.length;i++)if(3===n&&(n=0,s++),1===s&&n<3){console.log("first str");let e=document.createElement("div");e.setAttribute("id",`quiz-card-${t[i].id}`),e.setAttribute("class","card quizzes-desk__quiz-card"),e.innerHTML=f(t[i].title,t[i].description),document.getElementById("card-row-1").appendChild(e),document.getElementById(`quiz-card-${t[i].id}`).onclick=(()=>{b.redirectToQuiz(t[i].id)}),n++}else{if(0===n){let t=document.createElement("div");t.setAttribute("id",`card-row-${s}`),t.setAttribute("class","card-deck"),e.appendChild(t),console.log("new row = "),console.log(t)}let o=document.createElement("div");o.setAttribute("id",`quiz-card-${t[i].id}`),o.setAttribute("class","card quizzes-desk__quiz-card"),o.innerHTML=f(t[i].title,t[i].description),document.getElementById(`card-row-${s}`).appendChild(o),document.getElementById(`quiz-card-${t[i].id}`).onclick=(()=>{b.redirectToQuiz(t[i].id)}),n++}})}static quizzesReq(e){p.quizzesOfUser(function(t,n){if(t)return console.log(" error");console.log("quizzes of user norm"),console.log(t),console.log(n),e(n)})}}const q={INCORRECT_MESSAGE:"Использованы недопустимые символы",SUCCESS_MESSAGE:"Данные изменены!"};class S extends l{constructor(){super(),Object.assign(S.prototype,g),this.nameValue=document.querySelector("#profile-name").value,this.emailValue=document.querySelector("#profile-email").value,this.passwordValue=document.querySelector("#profile-old-password").value,this.newPasswordValue=document.querySelector("#profile-new-password").value,this.newPasswordValueRepeat=document.querySelector("#profile-repeat-password").value,this.errorBox=null,this.addEventsToButtons(),console.log("prof FORM")}static msgIncorrectInput(){return q.INCORRECT_MESSAGE}static msgSuccess(){return q.SUCCESS_MESSAGE}static validate(e,t,n,s,i){return!0}setFormValues(e){this.clearFields("profile-name","profile-email","profile-old-password","profile-new-password","profile-repeat-password","profile-form-error"),console.log(this.nameValue+" "+e.last_name),document.querySelector("#profile-name").value=e.last_name,document.querySelector("#profile-email").value=e.email}sendRequest(){p.changeUserData(this.nameValue,this.emailValue,(e,t)=>{if(e)return document.getElementById("profile-form-error").innerHTML="patch err",console.log("patch err");this.setFormValues(t),document.getElementById("profile-form-ok").innerHTML=S.msgSuccess()})}sendRequestChangePswd(){p.changePassword(this.passwordValue,this.newPasswordValue,(e,t)=>{if(e)return document.getElementById("profile-form-error").innerHTML="pswd err",console.log("pswd err");document.getElementById("profile-form-ok").innerHTML=S.msgSuccess()})}addEventsToButtons(){document.querySelector("#profile-form-btn").addEventListener("click",()=>{this.nameValue=document.querySelector("#profile-name").value,this.emailValue=document.querySelector("#profile-email").value,this.passwordValue=document.querySelector("#profile-old-password").value,this.newPasswordValue=document.querySelector("#profile-new-password").value,this.newPasswordValueRepeat=document.querySelector("#profile-repeat-password").value,console.log("prof BTN"),S.validate(this.nameValue,this.emailValue,this.passwordValue,this.newPasswordValue,this.newPasswordValueRepeat)&&(""!==this.passwordValue?this.newPasswordValue===this.newPasswordValueRepeat&&""!==this.newPasswordValue?(this.sendRequestChangePswd(),console.log("prof ch data"),this.sendRequest()):document.getElementById("profile-form-error").innerHTML="Неверно повторили пароль":""!==this.newPasswordValue?document.getElementById("profile-form-error").innerHTML="Введите старый пароль":this.sendRequest())})}}class w{getToken(){return null!==localStorage.getItem("token")?localStorage.getItem("token"):"no"}static getSessionKey(){return null!==localStorage.getItem("session_key")?localStorage.getItem("session_key"):"no"}static setToken(e){let t="Token "+e.token.toString();localStorage.setItem("token",t),console.log("TOKEN = "+localStorage.getItem("token"))}static setSessionKey(e){let t=e.session_key.toString();localStorage.setItem("session_key",t),console.log("session_key = "+localStorage.getItem("session_key"))}static setUser(e){localStorage.setItem("user",JSON.stringify(e)),console.log("USER = "+localStorage.getItem("user"))}autharization(e){w.setToken(e),w.setSessionKey(e),w.setUser(e)}deleteToken(){localStorage.removeItem("token"),localStorage.removeItem("session_key"),localStorage.removeItem("user")}}function z(e){console.log(e)}const B="ws://api.keklik.xyz/?session_key=",x="teacher",I="student",P={subscribe:"subscribe",join:"join",next_question:"next_question",answer:"answer",finish:"finish"},T={answering:"answering",finish:"finish"};class O{constructor(e="unknown"){this.role=e,this.socket=null,this.create(),this.addEvents()}create(){this.socket=new WebSocket(`${B}${w.getSessionKey()}`)}addEvents(){const e=this.socket;e.onopen=(()=>{z("EEEEEEEEEEEEEEEEEEEEEEEEEEEEE"),z("Соединение установлено"),z("EEEEEEEEEEEEEEEEEEEEEEEEEEEEE"),this.role===x?this.subscribeTeacher(i().gameManager.game_id):this.role===I&&(this.joinStudent(i().gameManager.game_id),this.subscribeStudent(i().gameManager.game_id))}),e.onclose=(e=>{z("EEEEEEEEEEEEEEEEEEEEEEEEEEEEE"),z("Соединение закрыто"),z("EEEEEEEEEEEEEEEEEEEEEEEEEEEEE")}),e.onmessage=(e=>{z("EEEEEEEEEEEEEEEEEEEEEEEEEEEEE"),z("Получено сообщение: "+e.data),z("EEEEEEEEEEEEEEEEEEEEEEEEEEEEE");const t=JSON.parse(e.data);this.role===x?t.payload.action===P.next_question&&t.payload.data.state!==T.finish?(z(t.payload.data.current_question+"_TEACHER_____________________________"),i().gameTeacherPage.renderQuestion(t)):t.payload.data.state===T.finish&&(z("_________________FINISH___________________"),i().gameTeacherPage.renderFinish(t)):this.role===I&&(t.payload.action===P.next_question&&t.payload.data.state!==T.finish?(z(t.payload.data.current_question+"_STUDENT_____________________________"),i().gameStudentPage.renderQuestion(t)):t.payload.action===P.finish&&(z("_________________FINISH___________________"),i().gameStudentPage.renderFinish(t)))}),e.onerror=(e=>{z("EEEEEEEEEEEEEEEEEEEEEEEEEEEEE"),z("Ошибка: "+e.message),z("EEEEEEEEEEEEEEEEEEEEEEEEEEEEE")})}joinStudent(e){z("SEND JOIN STUDENT"),this.socket.send(JSON.stringify({stream:"games",payload:{action:"join",pk:e}}))}subscribeTeacher(e){z("SEND SUBSCRIBE TEACHER"),this.socket.send(JSON.stringify({stream:"games",payload:{action:"subscribe",pk:e,data:{action:"join"}}})),this.socket.send(JSON.stringify({stream:"games",payload:{action:"subscribe",pk:e,data:{action:"answer"}}}))}subscribeStudent(e){z("Subscribe STUDENT"),this.socket.send(JSON.stringify({stream:"games",payload:{action:"subscribe",pk:e,data:{action:"next_question"}}})),this.socket.send(JSON.stringify({stream:"games",payload:{action:"subscribe",pk:e,data:{action:"finish"}}}))}sendNextMessage(e){z("GAME ID in sending = "+e),this.socket.send(JSON.stringify({stream:"games",payload:{action:"next_question",pk:e}}))}}class k{constructor(){i().gameManager=this,console.log("GAME MANAGER START"),this.ws_controller=null,this.game_id=null}start(e,t){document.getElementById("focus-btn").focus(),console.log("Переход на страницу с игрой "+e),p.createGame(e,t,(e,t)=>{e?console.log(e):(this.game_id=t.id,console.log("GAME ID = "+this.game_id),this.ws_controller=new O("teacher"),console.log("WS"))})}join(e){document.getElementById("focus-btn").focus(),this.game_id=e,this.ws_controller=new O("student")}switchNext(){this.ws_controller.sendNextMessage(this.game_id)}stop(){}}class M extends r{constructor(){super(),this.addRedirectOnButtons({button:"course-card-1",nextPage:"course-page",pagePath:"/course"}),this.addEventsOnButtons(),console.log("office"),i().user={},this.profileForm=new S,i().count_ws=0,i().joinBtnFlag=!1}static pagePath(){return"/office"}static pageBoxName(){return"office-page"}joinGameBtn(){i().gameStudentPage.attachRedirect(),document.getElementById("join-game-btn").addEventListener("click",()=>{const e=parseInt(document.getElementById("game-pin-input").value);console.log("INPUT ID = "+e),i().gameManager.join(e),i().count_ws+=1,console.log("HJGJGHJGJHGJGHJGJGJJG WS COUNT = "+i().count_ws)})}render(){return p.whoami((e,t)=>e?alert("office error"):(i().user=t,document.getElementById("office-header-username").innerHTML=i().user.username,this.profileForm.setFormValues(t),b.render(),!1===i().joinBtnFlag&&(this.joinGameBtn(),i().joinBtnFlag=!0),console.log("office norm")))}addEventsOnButtons(){document.getElementById("to-courses-btn").onclick=(()=>{console.log("C1"),document.getElementById("courses-desk").hidden=!1,document.getElementById("to-quizzes-btn").classList.remove("active"),document.getElementById("quizzes-desk").hidden=!0,document.getElementById("to-courses-btn").classList.add("active"),document.getElementById("profile").hidden=!0,document.getElementById("to-profile-btn").classList.remove("active")}),document.getElementById("to-quizzes-btn").onclick=(()=>{console.log("C2"),document.getElementById("courses-desk").hidden=!0,document.getElementById("to-quizzes-btn").classList.add("active"),document.getElementById("quizzes-desk").hidden=!1,document.getElementById("to-courses-btn").classList.remove("active"),document.getElementById("profile").hidden=!0,document.getElementById("to-profile-btn").classList.remove("active")}),document.getElementById("to-profile-btn").onclick=(()=>{console.log("C3"),document.getElementById("courses-desk").hidden=!0,document.getElementById("to-quizzes-btn").classList.remove("active"),document.getElementById("quizzes-desk").hidden=!0,document.getElementById("to-courses-btn").classList.remove("active"),document.getElementById("profile").hidden=!1,document.getElementById("to-profile-btn").classList.add("active")})}}class N extends r{constructor(){super(),this.addEventsOnButtons(),this.addRedirectOnButtons({button:"group-card-1",nextPage:"group-page",pagePath:"/group"}),console.log("course")}static pagePath(){return"/course"}static pageBoxName(){return"course-page"}addEventsOnButtons(){}}class R extends r{constructor(){super(),this.addEventsOnButtons(),this.addRedirectOnButtons({button:"to-play-btn-1",nextPage:"play-page",pagePath:"/play"}),console.log("group")}static pagePath(){return"/group"}static pageBoxName(){return"group-page"}addEventsOnButtons(){}}class H extends r{constructor(){super(),this.index=1,console.log("Quiz editor"),this.quiz={},this.resetQuiz(),i().quizEditorPage=this,this.editQuizById=!1}resetQuiz(){this.quiz={title:"",description:"",tags:"",questions:[]},this.index=1}addQuestion(){let e=document.createElement("div");e.innerHTML=function(e){return`<div class="edit-quiz-form__question-box" id="edit-quiz-form__question-box_${e}">\n            <div class="input-group mb-3">\n                <div class="input-group-prepend">\n                    <span class="input-group-text">Вопрос ${e+1} </span>\n                </div>\n                <textarea class="edit-question form-control" aria-label="Описание..."></textarea>\n            </div>\n\n            <div class="row edit-quiz-form-ans-row">\n                <div class="col">\n                    <div class="input-group mb-3">\n                        <div class="input-group-append">\n                            <span class="input-group-text">Вариант 1</span>\n                        </div>\n                        <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">\n                    </div>\n                </div>\n                <div class="col">\n                    <div class="input-group mb-3">\n                        <div class="input-group-append">\n                            <span class="input-group-text">Вариант 2</span>\n                        </div>\n                        <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">\n                    </div>\n                </div>\n            </div>\n            <div class="row edit-quiz-form-ans-row">\n                <div class="col">\n                    <div class="input-group mb-3">\n                        <div class="input-group-append">\n                            <span class="input-group-text">Вариант 3</span>\n                        </div>\n                        <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">\n                    </div>\n                </div>\n                <div class="col">\n                    <div class="input-group mb-3">\n                        <div class="input-group-append">\n                            <span class="input-group-text">Вариант 4</span>\n                        </div>\n                        <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">\n                    </div>\n                </div>\n            </div>\n            <div class="row edit-quiz-form-ans-row">\n                <div class="col">\n                    <div class="input-group mb-3">\n                        <div class="input-group-append">\n                            <span class="input-group-text">Вариант 5</span>\n                        </div>\n                        <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">\n                    </div>\n                </div>\n                <div class="col">\n                    <div class="input-group mb-3">\n                        <div class="input-group-append">\n                            <span class="input-group-text">Вариант 6</span>\n                        </div>\n                        <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">\n                    </div>\n                </div>\n            </div>\n            <div class="row edit-quiz-form-ans-row">\n                <div class="col">\n                    <div class="input-group mb-3">\n                        <div class="input-group-append">\n                            <span class="input-group-text">Вариант 7</span>\n                        </div>\n                        <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">\n                    </div>\n                </div>\n                <div class="col">\n                    <div class="input-group mb-3">\n                        <div class="input-group-append">\n                            <span class="input-group-text">Вариант 8</span>\n                        </div>\n                        <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">\n                    </div>\n                </div>\n            </div>\n            <div class="row edit-quiz-form-ans-row">\n                <div class="col">\n                    <div class="input-group mb-3">\n                        <div class="input-group-append">\n                            <span class="input-group-text bg-success text-white">Правильный вариант</span>\n                        </div>\n                        <input maxlength="1" type="text" class="edit-answer form-control" placeholder="1" aria-label="" aria-describedby="basic-addon2">\n                    </div>\n                </div>\n                <div class="col">\n                    <div class="input-group mb-3">\n                        <div class="input-group-append">\n                            <span class="input-group-text bg-info text-white">Максимум очков за ответ</span>\n                        </div>\n                        <input maxlength="3" type="text" class="edit-points form-control" placeholder="5" aria-label="" aria-describedby="basic-addon2">\n                    </div>\n                </div>\n            </div>\n        </div><hr><br>`}(this.index),document.getElementById("edit-quiz-form__questions").appendChild(e),this.index++}pushToQuiz(){this.quiz.title=document.getElementById("edit-quiz-form").querySelector("#edit-quiz-form__title").value,this.quiz.description=document.getElementById("edit-quiz-form").querySelector("#edit-quiz-form__description").value,this.quiz.tags=document.getElementById("edit-quiz-form").querySelector("#edit-quiz-form__tags").value.split(",");let e=document.getElementsByClassName("edit-quiz-form__question-box");for(let t=0;t<e.length;t++){let n=[],s=e[t].getElementsByClassName("edit-variant"),i=s.length;for(let e=0;e<i;e++){let t=s[e].value.toString();""!==t&&n.push({variant:t})}this.quiz.questions.push({type:"single",question:e[t].querySelector(".edit-question").value.toString(),variants:n,answer:[parseInt(e[t].querySelector(".edit-answer").value)],points:parseInt(e[t].querySelector(".edit-points").value)})}console.log(this.quiz)}validate(){let e=l.correctQuiz(this.quiz);return console.log("err = "+e),!0}sendRequest(){!1!==this.editQuizById?p.quizEdit(this.editQuizById,this.quiz,(e,t)=>{if(e)return console.log("err in quiz");console.log("ok in quiz edit"+t),document.getElementById("nav-office-btn").click(),this.editQuizById=!1}):p.quizNew(this.quiz,(e,t)=>{if(e)return console.log("err in quiz");console.log("ok in quiz"+t),document.getElementById("nav-office-btn").click()})}startQuizBtn(e){let t=document.createElement("button");t.innerHTML="Запуcтить",t.setAttribute("id","start-game-btn"),t.setAttribute("class","btn btn-success start-btn"),document.getElementById("quiz-editor-h3").appendChild(t),i().gameTeacherPage.attachRedirect(),t.addEventListener("click",()=>{i().gameManager.start(this.editQuizById,e.title)})}render(e,t){document.getElementById("new-quiz").click(),console.log("ID = "+e),this.editQuizById=e,document.getElementById("quiz-editor-h3").innerHTML=`Викторина ${this.editQuizById}`,this.startQuizBtn(t),document.getElementById("edit-quiz-form").querySelector("#edit-quiz-form__title").value=t.title,document.getElementById("edit-quiz-form").querySelector("#edit-quiz-form__description").value=t.description,document.getElementById("edit-quiz-form").querySelector("#edit-quiz-form__tags").value=t.tags.join();let n=t.questions.length;console.log("questionsCount"+n);for(let e=0;e<n-1;e++)this.index=e+1,this.addQuestion();let s=document.getElementsByClassName("edit-quiz-form__question-box");for(let e=0;e<n;e++){s[e].querySelector(".edit-question").value=t.questions[e].question;let n=t.questions[e].variants,i=t.questions[e].variants.length,o=s[e].getElementsByClassName("edit-variant");for(let e=0;e<i;e++)o[e].value=n[e].variant;s[e].querySelector(".edit-answer").value=t.questions[e].answer,s[e].querySelector(".edit-points").value=t.questions[e].points}}addEventsOnButtons(){document.getElementById("edit-quiz-form__add-question-btn").onclick=(()=>{this.addQuestion()}),document.getElementById("edit-quiz-form__send-btn").onclick=(()=>{this.pushToQuiz(),this.validate()&&(this.sendRequest(),this.resetQuiz())})}clearForm(){console.log("clear form"),this.editQuizById=!1,console.log(this.editQuizById),document.querySelector(".edit-page__form").innerHTML="",document.querySelector(".edit-page__form").innerHTML='<h3 id="quiz-editor-h3">Создание викторины</h3>\n        <div class="edit-quiz-box" id="edit-quiz-form">\n            <div class="input-group mb-3">\n                <div class="input-group-prepend">\n                    <span class="input-group-text">Название </span>\n                </div>\n                <textarea id="edit-quiz-form__title" class="form-control" aria-label="Новая викторина..."></textarea>\n            </div>\n            <div class="input-group mb-3">\n                <div class="input-group-prepend">\n                    <span class="input-group-text">Описание</span>\n                </div>\n                <textarea id="edit-quiz-form__description" class="form-control" aria-label="Описание..."></textarea>\n            </div>\n\n            <div class="input-group mb-3">\n                <label>Метки викторины &nbsp;</label>\n                <input id="edit-quiz-form__tags" class="form-control" type="text" placeholder="Математика, Физика">\n            </div>\n            <hr>\n            <br>\n            <div id="edit-quiz-form__questions">\n                <div class="edit-quiz-form__question-box" id="edit-quiz-form__question-box_0">\n                    <div class="input-group mb-3">\n                        <div class="input-group-prepend">\n                            <span class="input-group-text">Вопрос 1</span>\n                        </div>\n                        <textarea class="edit-question form-control" aria-label="Описание..."></textarea>\n                    </div>\n\n                    <div class="row edit-quiz-form-ans-row">\n                        <div class="col">\n                            <div class="input-group mb-3">\n                                <div class="input-group-append">\n                                    <span class="input-group-text">Вариант 1</span>\n                                </div>\n                                <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">\n                            </div>\n                        </div>\n                        <div class="col">\n                            <div class="input-group mb-3">\n                                <div class="input-group-append">\n                                    <span class="input-group-text">Вариант 2</span>\n                                </div>\n                                <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">\n                            </div>\n                        </div>\n                    </div>\n                    <div class="row edit-quiz-form-ans-row">\n                        <div class="col">\n                            <div class="input-group mb-3">\n                                <div class="input-group-append">\n                                    <span class="input-group-text">Вариант 3</span>\n                                </div>\n                                <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">\n                            </div>\n                        </div>\n                        <div class="col">\n                            <div class="input-group mb-3">\n                                <div class="input-group-append">\n                                    <span class="input-group-text">Вариант 4</span>\n                                </div>\n                                <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">\n                            </div>\n                        </div>\n                    </div>\n                    <div class="row edit-quiz-form-ans-row">\n                        <div class="col">\n                            <div class="input-group mb-3">\n                                <div class="input-group-append">\n                                    <span class="input-group-text">Вариант 5</span>\n                                </div>\n                                <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">\n                            </div>\n                        </div>\n                        <div class="col">\n                            <div class="input-group mb-3">\n                                <div class="input-group-append">\n                                    <span class="input-group-text">Вариант 6</span>\n                                </div>\n                                <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">\n                            </div>\n                        </div>\n                    </div>\n                    <div class="row edit-quiz-form-ans-row">\n                        <div class="col">\n                            <div class="input-group mb-3">\n                                <div class="input-group-append">\n                                    <span class="input-group-text">Вариант 7</span>\n                                </div>\n                                <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">\n                            </div>\n                        </div>\n                        <div class="col">\n                            <div class="input-group mb-3">\n                                <div class="input-group-append">\n                                    <span class="input-group-text">Вариант 8</span>\n                                </div>\n                                <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">\n                            </div>\n                        </div>\n                    </div>\n                    <div class="row edit-quiz-form-ans-row">\n                        <div class="col">\n                            <div class="input-group mb-3">\n                                <div class="input-group-append">\n                                    <span class="input-group-text bg-success text-white">Правильный вариант</span>\n                                </div>\n                                <input maxlength="1" type="text" class="edit-answer form-control" placeholder="1" aria-label="" aria-describedby="basic-addon2">\n                            </div>\n                        </div>\n                        <div class="col">\n                            <div class="input-group mb-3">\n                                <div class="input-group-append">\n                                    <span class="input-group-text bg-info text-white">Максимум очков за ответ</span>\n                                </div>\n                                <input maxlength="3" type="text" class="edit-points form-control" placeholder="5" aria-label="" aria-describedby="basic-addon2">\n                            </div>\n                        </div>\n                    </div>\n                </div><hr><br>\n            </div>\n        </div>',this.index=1}}class L extends r{constructor(){super(),this.addEventsOnButtons(),console.log("teacher")}static pagePath(){return"/teacher"}static pageBoxName(){return"teacher-page"}attachRedirect(){this.addRedirectOnButtons({button:"start-game-btn",nextPage:"play-page-manage",pagePath:"/teacher"}),console.log("add redirect")}addEventsOnButtons(){document.getElementById("next-question-btn").onclick=(()=>{i().gameManager.switchNext()})}renderQuestion(e){document.getElementById("question-preview").innerHTML=e.payload.data.current_question.question}renderFinish(e){document.getElementById("question-preview").innerHTML="Викторина завершена"}}class C extends r{constructor(){super(),this.addEventsOnButtons(),console.log("student")}static pagePath(){return"/play"}static pageBoxName(){return"play-page"}attachRedirect(){this.addRedirectOnButtons({button:"join-game-btn",nextPage:"play-page",pagePath:"/play"}),console.log("add redirect")}renderQuestion(e){document.getElementById("play-page-header").innerHTML=e.payload.data.quiz.title,document.getElementById("play-page-question").innerHTML="Вопрос "+e.payload.data.current_question.number+": "+e.payload.data.current_question.question}renderFinish(){document.getElementById("play-page-header").innerHTML="ВИКТОРИНА ЗАВЕРШЕНА",document.getElementById("play-page-question").innerHTML="ВИКТОРИНА ЗАВЕРШЕНА"}addEventsOnButtons(){}}class A{constructor(){this.addRedirectOnNavBtn({button:"nav-main-btn",nextPage:"main-page",pagePath:"/main"},{button:"nav-login-btn",nextPage:"login-page",pagePath:"/login"},{button:"nav-info-btn",nextPage:"info-page",pagePath:"/info"},{button:"nav-office-btn",nextPage:"office-page",pagePath:"/office"}),i().registerPage=new h,i().loginPage=new _,i().officePage=new M,i().coursePage=new N,i().groupPage=new R,i().quizEditor=new H,i().gameTeacherPage=new L,i().gameStudentPage=new C,i().gameManager=new k;h.pagePath();a({button:"regform-to-login-link",nextPage:"login-page",pagePath:"/login"},{button:"login-form-to-register-link",nextPage:"register-page",pagePath:"/register"}),document.getElementById("nav-signout-btn").onclick=(()=>{i().authWorker.deleteToken(),document.getElementById("nav-login-btn").click()}),A.redirect(),window.addEventListener("popstate",()=>{A.redirect()})}navigate(){}addRedirectOnNavBtn(...e){a(...e)}static redirect(){const e=window.location.pathname;switch(p.whoami(t=>{if(t){switch(document.getElementById("nav-signout-btn").hidden=!0,document.getElementById("nav-login-btn").hidden=!1,e){case"/main":o.showOnlyOnePage("main-page");break;case"/office":document.getElementById("nav-login-btn").click();break;case"/register":o.showOnlyOnePage("register-page");break;case"/login":o.showOnlyOnePage("login-page");break;case"/info":o.showOnlyOnePage("info-page");break;default:o.showOnlyOnePage("main-page")}return console.log("NOT AUTH")}return console.log("NORM AUTH")}),document.getElementById("nav-signout-btn").hidden=!1,document.getElementById("nav-login-btn").hidden=!0,e){case"/main":o.showOnlyOnePage("main-page");break;case"/office":p.whoami((e,t)=>e?(document.getElementById("nav-login-btn").click(),console.log("office error router")):(i().officePage.render(),o.showOnlyOnePage("office-page"),console.log("office norm router")));break;case"/info":o.showOnlyOnePage("info-page");break;case"/course":o.showOnlyOnePage("course-page");break;case"/group":o.showOnlyOnePage("group-page");break;case"/play":o.showOnlyOnePage("play-page");break;case"/edit":o.showOnlyOnePage("edit-page");break;case"/teacher":o.showOnlyOnePage("play-page-manage");break;default:o.showOnlyOnePage("office-page")}}}window.addEventListener("load",function(){console.log("HELLO APP"),i().authWorker=new w,i().router=new A,i().router,document.querySelector(".main-box").hidden=!1})}]);