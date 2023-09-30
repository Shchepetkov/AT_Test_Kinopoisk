"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultSearch = void 0;
const AbstractPage_1 = require("./AbstractPage");
const selenium_webdriver_1 = require("selenium-webdriver");
const chai_1 = require("chai");
class ResultSearch extends AbstractPage_1.AbstractPage {
    constructor() {
        super(...arguments);
        this.locatorListOfFilms = selenium_webdriver_1.By.xpath("//td[@id = 'block_left_pad']//child::div[@class = 'element']/child::span[text() = " +
            "'" + this.countSearchFilms + "']/preceding::div[@class = 'info']/p[@class = 'name']/a[contains(text(), '" + this.shortNameFilm + "')]");
        this.locatorListOfRating = selenium_webdriver_1.By.xpath("//td[@id = 'block_left_pad']//child::div[@class = 'element']/child::span[text() = " +
            "'" + this.countSearchFilms + "']/preceding::div[@class = 'info']/preceding::div[@class = 'right']/div");
        this.filmsNameAndRating = new Map();
    }
    getFilmsAndRating() {
        return __awaiter(this, void 0, void 0, function* () {
            let listFilms = yield this.driver.findElements(this.locatorListOfFilms);
            let rating = yield this.driver.findElements(this.locatorListOfRating);
            for (let index in listFilms) {
                let grade = Number(yield rating[index].getText());
                let filmName = yield listFilms[index].getText();
                this.filmsNameAndRating.set(filmName, grade);
            }
        });
    }
    checkNameFilm(whatMovie) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.filmsNameAndRating.get(whatMovie) == null) {
                yield chai_1.assert.ok(false, "В данном списке фильм с именем: \"" + whatMovie + "\" не найден");
            }
        });
    }
    checkRatingFilm(whatMovie, whatGrade) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkNameFilm(whatMovie);
            if (Number(this.filmsNameAndRating.get(whatMovie)) < whatGrade) {
                yield chai_1.assert.ok(false, "В данном списке фильм с именем: \"" + whatMovie + "\" имеется, но его рейтингом " + this.filmsNameAndRating.get(whatMovie));
            }
        });
    }
}
exports.ResultSearch = ResultSearch;
