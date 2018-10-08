/**
 * Класс для запросов на сервер
 */
"use strict";

import globalBus from "../globalBus";

const messagesFromHost = {
    HTTP_OK : 2,
    XHR_READY : 4
};

const WITH_CREDENTIALS = true;

export default class Requester {

    /**
     * Возвращает url backend сервера
     * @returns {string}
     */
    static baseUrl() {
        // return  "https://keklik-api.herokuapp.com/";
        return "http://46.229.213.75:8000/"
    }

    /**
     * HTTP-запрос на сервер
     * @param {string} method - метод запроса "GET", "POST"
     * @param {string} address
     * @param {object} data
     * @param callback
     */
    static requestToHost(method = "GET", address, data = null, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, this.baseUrl() + address, true);
        xhr.withCredentials = WITH_CREDENTIALS; //for cookies

        const body = JSON.stringify(data);

        xhr.setRequestHeader("Content-Type", "application/json; charset=utf8");
        xhr.setRequestHeader("Authorization", globalBus().authWorker.getToken());

        if (method === "GET") {
            xhr.send(null);
        } else {
            xhr.send(body);
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== messagesFromHost.XHR_READY) {
                return;
            }
            if (parseInt(+xhr.status/100) !== messagesFromHost.HTTP_OK) {
                return callback(xhr, null);
            }

            const response = JSON.parse(xhr.responseText);

            callback(null, response);
        };
    }

    /**
     * Авторизация пользователя
     * @param username
     * @param password
     * @param callback
     */
    static auth(username, password, callback) {
        const user = {username, password};
        Requester.requestToHost("POST", "api/session/", user, callback);
    }

    /**
     * Регистрация пользователя
     * @param username
     * @param password
     * @param callback
     */
    static register(username, password, callback) {
        const user = {username, password};
        Requester.requestToHost("POST", "api/users/", user, callback);
    }

    /**
     * Узнает информацию о текущем пользователе
     * @param callback
     */
    static whoami(callback) {
        Requester.requestToHost("GET", "api/users/me/", null, callback);
    }

    static quizEdit(quiz, callback) {
        Requester.requestToHost("POST", "api/quizzes/", quiz, callback);
    }

    static quizzesOfUser(callback) {
        Requester.requestToHost("GET", "api/quizzes/", null, callback);
    }
}
