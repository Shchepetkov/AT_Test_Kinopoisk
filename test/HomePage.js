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
exports.HomePage = void 0;
const AbstractPage_1 = require("./AbstractPage");
const selenium_webdriver_1 = require("selenium-webdriver");
class HomePage extends AbstractPage_1.AbstractPage {
    constructor() {
        super(...arguments);
        this.locatorClickAdvancedSearch = selenium_webdriver_1.By.xpath("//a[@aria-label = 'advanced-search']");
    }
    openAdvancedSearch() {
        return __awaiter(this, void 0, void 0, function* () {
            let search = yield this.driver.findElement(this.locatorClickAdvancedSearch);
            yield search.click();
        });
    }
}
exports.HomePage = HomePage;
