"use strict";

import Page from "../../Page";
import Requester from "../../../modules/network/Requester.js";
import quizCard from "./quizCard";
import linkOnButtons from "../../../modules/linkOnButtons";
import globalBus from "../../../modules/globalBus.js";
import debugLog from "../../../modules/debugLog";

export default class QuizzesDesk extends Page {

    static newQuizCard() {
        return `<div id="card-row-1" class="card-deck">
                                <div id="new-quiz" class="card new-quiz">
                                    <img class="card-img-top" src="img/add_quiz.png" alt="Card image cap">
                                    <div class="card-body text-white">
                                        <h5 class="card-title">Новая викторина</h5>
                                        <hr>
                                        <p class="card-text">Создание нового набора вопросов</p>
                                    </div>
                                </div>`
    }

    static redirectToQuiz(id) {
        debugLog(id);
        Requester.getQuizById(id, (err, resp) => {
            if (err) {
                debugLog(err);
            } else {
                debugLog("quiz " + id + " rendering");
                globalBus().quizEditorPage.render(id, resp);
            }
        });
    }

    static renderNewQuizCard(quizzesDesk) {
        quizzesDesk.innerHTML = QuizzesDesk.newQuizCard();
        linkOnButtons(
            {button: "new-quiz", nextPage: "edit-page", pagePath: "/edit"}
        );
        document.getElementById("new-quiz").addEventListener("click", () => {
            globalBus().quizEditorPage.clearForm();
        });
        document.getElementById("new-quiz").hidden = true;
    }

    static render() {
        debugLog("Quiz Desk");
        let quizzesDesk = document.getElementById("quizzes-desk");
        quizzesDesk.innerHTML = "";
        QuizzesDesk.renderNewQuizCard(quizzesDesk);
        QuizzesDesk.quizzesReq((resp) => {
            debugLog(resp);
            let cardsInRow = 1;
            let rowCount = 1;
            for (let i = 0; i < resp.length; i++) {
                if (cardsInRow === 3) {
                    cardsInRow = 0;
                    rowCount++;
                }
                if (rowCount === 1 && cardsInRow < 3) {
                    debugLog("first str");
                    let caBox = document.createElement('div');
                    // <div id="quiz-card-${id}" class="card quizzes-desk__quiz-card">
                    caBox.setAttribute("id", `quiz-card-${resp[i].id}`);
                    caBox.setAttribute("class", "card quizzes-desk__quiz-card");
                    caBox.innerHTML = quizCard(resp[i].title, resp[i].description, resp[i].version_date.split("T")[0]);
                    document.getElementById("card-row-1").appendChild(caBox);
                    document.getElementById(`quiz-card-${resp[i].id}`).onclick = () => {
                        QuizzesDesk.redirectToQuiz(resp[i].id)
                    };
                    cardsInRow++;
                } else {
                    if (cardsInRow === 0) {
                        let newRow = document.createElement('div');
                        newRow.setAttribute("id", `card-row-${rowCount}`);
                        newRow.setAttribute("class", "card-deck");
                        quizzesDesk.appendChild(newRow);
                        debugLog("new row = ");
                        debugLog(newRow);
                    }
                    let caBox = document.createElement('div');
                    caBox.setAttribute("id", `quiz-card-${resp[i].id}`);
                    caBox.setAttribute("class", "card quizzes-desk__quiz-card");
                    caBox.innerHTML = quizCard(resp[i].title, resp[i].description, resp[i].version_date.split("T")[0]);
                    document.getElementById(`card-row-${rowCount}`).appendChild(caBox);
                    document.getElementById(`quiz-card-${resp[i].id}`).onclick = () => {
                        QuizzesDesk.redirectToQuiz(resp[i].id)
                    };
                    cardsInRow++;
                }
            }
            document.getElementById("new-quiz").hidden = false;
        });
    }

    static quizzesReq(callback) {
        Requester.quizzesOfUser(function(err, resp) {
            if (err) {
                return console.log(" error");
            }
            debugLog("quizzes of user norm");
            debugLog(err);
            debugLog(resp);
            callback(resp);
        });
    }
}