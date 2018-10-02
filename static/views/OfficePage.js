"use strict";

import Page from "./Page.js";
import PagePresenter from "../modules/PagePresenter";
import globalBus from "../modules/globalBus";
import Requester from "../modules/network/Requester";

export default class OfficePage extends Page {

    constructor() {
        super();
        // щелчок по карточке курса
        this.addRedirectOnButtons(
            {button: "course-card-1", nextPage: "course-page", pagePath: "/course"}
        );
        this.addEventsOnButtons();
        console.log("office");
        globalBus().user = {};
    }

    static pagePath() {
        return "/office";
    }

    static pageBoxName() {
        return "office-page";
    }

    render() {
        return Requester.whoami((err, resp) => {
            if (err) {
                return alert("office error");
            }
            globalBus().user = resp;
            document.getElementById("office-header-username").innerHTML = globalBus().user.username;
            return console.log("office norm");
        });
    }

    addEventsOnButtons() {
        document.getElementById("to-courses-btn").onclick = () => {
            console.log("C1");
            document.getElementById("courses-desk").hidden = false;
            document.getElementById("to-quizes-btn").classList.remove("active");
            document.getElementById("quizes-desk").hidden = true;
            document.getElementById("to-courses-btn").classList.add("active");
            document.getElementById("profile").hidden = true;
            document.getElementById("to-profile-btn").classList.remove("active");
        };

        document.getElementById("to-quizes-btn").onclick = () => {
            console.log("C2");
            document.getElementById("courses-desk").hidden = true;
            document.getElementById("to-quizes-btn").classList.add("active");
            document.getElementById("quizes-desk").hidden = false;
            document.getElementById("to-courses-btn").classList.remove("active");
            document.getElementById("profile").hidden = true;
            document.getElementById("to-profile-btn").classList.remove("active");
        };

        document.getElementById("to-profile-btn").onclick = () => {
            console.log("C3");
            document.getElementById("courses-desk").hidden = true;
            document.getElementById("to-quizes-btn").classList.remove("active");
            document.getElementById("quizes-desk").hidden = true;
            document.getElementById("to-courses-btn").classList.remove("active");
            document.getElementById("profile").hidden = false;
            document.getElementById("to-profile-btn").classList.add("active");
        }
    }
}