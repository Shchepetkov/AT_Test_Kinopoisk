import {HomePage} from './HomePage';
import {AdvancedSearch} from "./AdvancedSearch";
import {ResultSearch} from "./ResultSearch";

const {promise} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');

promise.USE_PROMISE_MANAGER = false;

describe('Kinopoisk Tests', async function () {

    let driver: any;
    let homePage: any;
    let advancedSearch: any;
    let resultSearch: any;

    beforeEach(async (): Promise<void> => {
        driver = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome'}).build();
        homePage = new HomePage(driver);
        advancedSearch = new AdvancedSearch(driver);
        resultSearch = new ResultSearch(driver);
    });

    afterEach(async (): Promise<void> => {
        await driver.close();
    });


    it('open kinopoisk.ru', async function () {

        this.timeout(20000);
        await driver.manage().setTimeouts({implicit: 15000});

        await homePage.open("https://www.kinopoisk.ru/");
        await homePage.openAdvancedSearch();
        await advancedSearch.enterParametersAndClickSearch();
        await resultSearch.getFilmsAndRating();
        await resultSearch.checkNameFilm("Форсаж 5");
        await resultSearch.checkRatingFilm("Форсаж 5", 5);
    });
});