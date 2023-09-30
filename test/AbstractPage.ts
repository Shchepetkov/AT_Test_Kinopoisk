import {WebDriver} from "selenium-webdriver";

export abstract class AbstractPage {

    protected driver: WebDriver;
    protected shortNameFilm: string = "Фор";
    protected genreRename: string = "боевик";
    protected findRename: string = "поиск";
    protected countSearchFilms: string = "5";

    constructor(driver: WebDriver) {
        this.driver = driver;
        this.driver.manage().window().maximize();
    }

    public async close(): Promise<void> {
        await this.driver.quit();
    }

    public async open(url: string): Promise<void> {
        await this.driver.get(url);
    }
}
