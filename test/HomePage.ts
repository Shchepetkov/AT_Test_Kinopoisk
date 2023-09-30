import {AbstractPage} from './AbstractPage';
import {By} from "selenium-webdriver";

export class HomePage extends AbstractPage {

    private locatorClickAdvancedSearch: By = By.xpath("//a[@aria-label = 'advanced-search']");

    async openAdvancedSearch(): Promise<void> {
        let search = await this.driver.findElement(this.locatorClickAdvancedSearch);
        await search.click();
    }
}