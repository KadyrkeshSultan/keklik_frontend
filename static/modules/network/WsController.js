"use strict";

import globalBus from "../globalBus";
import AuthWorker from "./AuthWorker";
import debugLog from "./../debugLog";

const WS_URL = "ws://api.keklik.xyz/?session_key=";
const TEACHER_ROLE = "teacher";
const STUDENT_ROLE = "student";

const ACTIONS = {
    "subscribe" : "subscribe",
    "join" : "join",
    "next_question" : "next_question",
    "answer" : "answer",
    "finish" : "finish"
};

const STATE = {
    "answering" : "answering",
    "finish" : "finish"
};
export default class WsController {
    // передавать вид события
    constructor(role="unknown") {
        this.role = role;
        this.socket = null;
        this.create();
        this.addEvents();
    }

    create() {
        this.socket = new WebSocket(`${WS_URL}${AuthWorker.getSessionKey()}`);
    }

    addEvents() {
        const socket = this.socket;

        socket.onopen = () => {
            debugLog("EEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
            debugLog("Соединение установлено");
            debugLog("EEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
            if (this.role === TEACHER_ROLE) {
                this.subscribeTeacher();
            } else if (this.role === STUDENT_ROLE) {
                debugLog("Subscribe STUDENT");
            }
        };

        socket.onclose = (event) => {
            debugLog("EEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
            debugLog("Соединение закрыто");
            debugLog("EEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
            // reload
        };

        socket.onmessage = (event) => {
            debugLog("EEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
            debugLog("Получено сообщение: " + event.data);
            debugLog("EEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
            const ws_dataObj = JSON.parse(event.data);
            if (this.role === TEACHER_ROLE) {
                // рендерить только экшн next question и потом экшн aswer
                if (ws_dataObj.payload.action === ACTIONS.next_question &&
                    ws_dataObj.payload.data.state !== STATE.finish) {
                    debugLog(ws_dataObj.payload.data.current_question + "______________________________");
                    globalBus().gameTeacherPage.renderQuestion(ws_dataObj);
                } else if (ws_dataObj.payload.data.state === STATE.finish) {
                    debugLog("_________________FINISH___________________");
                    globalBus().gameTeacherPage.renderFinish(ws_dataObj);
                }
            } else if (this.role === STUDENT_ROLE) {
                debugLog("RENDER STUDENT");
            }
        };

        socket.onerror = (error) => {
            debugLog("EEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
            debugLog("Ошибка: " + error.message);
            debugLog("EEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
            // reload
        };
    }

    subscribeTeacher(game_id) {
        debugLog("SEND SUBSCRIBE TEACHER");
        this.socket.send(JSON.stringify(
            {
                "stream": "games",
                "payload": {
                    "action": "subscribe",
                    "pk": game_id,
                "data": {
                    "action": "join"
                    }
                }
            }));
        this.socket.send(JSON.stringify(
            {
                "stream": "games",
                "payload": {
                "action": "subscribe",
                    "pk": game_id,
                "data": {
                    "action": "answer"
                    }
                }
            }));
    }

    sendNextMessage(game_id) {
        debugLog("GAME ID in sending = " + game_id);
        this.socket.send(
            JSON.stringify({
            "stream": "games",
            "payload": {
                "action": "next_question",
                "pk": game_id
            }
        }));
    }
}