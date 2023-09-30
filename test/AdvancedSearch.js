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
exports.AdvancedSearch = void 0;
const AbstractPage_1 = require("./AbstractPage");
const selenium_webdriver_1 = require("selenium-webdriver");
class AdvancedSearch extends AbstractPage_1.AbstractPage {
    constructor() {
        super(...arguments);
        this.locatorFind = selenium_webdriver_1.By.id("find_film");
        this.locatorGenreSelection = selenium_webdriver_1.By.xpath("//select[@id = 'm_act[genre]']/child::option[contains(text(), '" + this.genreRename + "')]");
        this.locatorClickingSearch = selenium_webdriver_1.By.xpath("//form[@id = 'formSearchMain']//child::input[@value = '" + this.findRename + "']");
    }
    enterParametersAndClickSearch() {
        return __awaiter(this, void 0, void 0, function* () {
            let findFilm = yield this.driver.findElement(this.locatorFind);
            yield findFilm.click();
            yield findFilm.sendKeys(this.shortNameFilm);
            let genre = yield this.driver.findElement(this.locatorGenreSelection);
            yield genre.click();
            let find = yield this.driver.findElement(this.locatorClickingSearch);
            yield find.click();
        });
    }
}
exports.AdvancedSearch = AdvancedSearch;
