import {AbstractPage} from './AbstractPage';
import {By} from "selenium-webdriver";

export class AdvancedSearch extends AbstractPage {

    private locatorFind: By = By.id("find_film");
    private locatorGenreSelection: By = By.xpath("//select[@id = 'm_act[genre]']/child::option[contains(text(), '" + this.genreRename + "')]");
    private locatorClickingSearch: By = By.xpath("//form[@id = 'formSearchMain']//child::input[@value = '" + this.findRename + "']");

    async enterParametersAndClickSearch(): Promise<void> {
        let findFilm = await this.driver.findElement(this.locatorFind);
        await findFilm.click();
        await findFilm.sendKeys(this.shortNameFilm);

        let genre = await this.driver.findElement(this.locatorGenreSelection);
        await genre.click();

        let find = await this.driver.findElement(this.locatorClickingSearch);
        await find.click();
    }
}