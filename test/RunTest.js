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
const HomePage_1 = require("./HomePage");
const AdvancedSearch_1 = require("./AdvancedSearch");
const ResultSearch_1 = require("./ResultSearch");
const { promise } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
promise.USE_PROMISE_MANAGER = false;
describe('Kinopoisk Tests', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let driver;
        let homePage;
        let advancedSearch;
        let resultSearch;
        beforeEach(() => __awaiter(this, void 0, void 0, function* () {
            driver = new webdriver.Builder().usingServer().withCapabilities({ 'browserName': 'chrome' }).build();
            homePage = new HomePage_1.HomePage(driver);
            advancedSearch = new AdvancedSearch_1.AdvancedSearch(driver);
            resultSearch = new ResultSearch_1.ResultSearch(driver);
        }));
        afterEach(() => __awaiter(this, void 0, void 0, function* () {
            yield driver.close();
        }));
        it('open kinopoisk.ru', function () {
            return __awaiter(this, void 0, void 0, function* () {
                this.timeout(20000);
                yield driver.manage().setTimeouts({ implicit: 15000 });
                yield homePage.open("https://www.kinopoisk.ru/");
                yield homePage.openAdvancedSearch();
                yield advancedSearch.enterParametersAndClickSearch();
                yield resultSearch.getFilmsAndRating();
                yield resultSearch.checkNameFilm("Форсаж 5");
                yield resultSearch.checkRatingFilm("Форсаж 5", 5);
            });
        });
    });
});
