"use strict";

export default function questionBox(index) {
    return (
        `<div class="edit-quiz-form__question-box" id="edit-quiz-form__question-box_${index}">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Вопрос ${index} </span>
                </div>
                <textarea class="edit-question form-control" aria-label="Описание..."></textarea>
            </div>

            <div class="row edit-quiz-form-ans-row">
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-append">
                            <span class="input-group-text">Вариант 1</span>
                        </div>
                        <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">
                    </div>
                </div>
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-append">
                            <span class="input-group-text">Вариант 2</span>
                        </div>
                        <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">
                    </div>
                </div>
            </div>
            <div class="row edit-quiz-form-ans-row">
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-append">
                            <span class="input-group-text">Вариант 3</span>
                        </div>
                        <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">
                    </div>
                </div>
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-append">
                            <span class="input-group-text">Вариант 4</span>
                        </div>
                        <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">
                    </div>
                </div>
            </div>
            <div class="row edit-quiz-form-ans-row">
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-append">
                            <span class="input-group-text">Вариант 5</span>
                        </div>
                        <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">
                    </div>
                </div>
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-append">
                            <span class="input-group-text">Вариант 6</span>
                        </div>
                        <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">
                    </div>
                </div>
            </div>
            <div class="row edit-quiz-form-ans-row">
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-append">
                            <span class="input-group-text">Вариант 7</span>
                        </div>
                        <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">
                    </div>
                </div>
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-append">
                            <span class="input-group-text">Вариант 8</span>
                        </div>
                        <input type="text" class="edit-variant form-control" placeholder="" aria-label="" aria-describedby="basic-addon2">
                    </div>
                </div>
            </div>
            <div class="row edit-quiz-form-ans-row">
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-append">
                            <span class="input-group-text bg-success text-white">Правильный варианта</span>
                        </div>
                        <input maxlength="1" type="text" class="edit-answer form-control" placeholder="1" aria-label="" aria-describedby="basic-addon2">
                    </div>
                </div>
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-append">
                            <span class="input-group-text bg-info text-white">Максимум очков за ответ</span>
                        </div>
                        <input maxlength="3" type="text" class="edit-points form-control" placeholder="5" aria-label="" aria-describedby="basic-addon2">
                    </div>
                </div>
            </div>
        </div><hr><br>`
    );
}